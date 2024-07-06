from odoo import models, fields, _, api, modules
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import shutil
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
import datetime
import fitz
import PyPDF2
from PIL import Image
import pytesseract
import io
from deep_translator import GoogleTranslator
import time
tessdata_dir_config = '--tessdata-dir "/Users/sauravthakur/Desktop/odoo_projects/IIDS_mgmt_system/custom_addons/GenAI/static/local_dataset"'    




def np_pdf_to_text(doc):
  """
  reads the pdf and returns the nepali text written on it
  :param docs: pdf file object
  type pdf_file:fitz
  return: list of page's texts in the pdf
  """
  texts = []

  for i in range(doc.page_count):
    page = doc.load_page(i)
    pixmap = page.get_pixmap(dpi=300)
    bytes_image = pixmap.tobytes()
    img = Image.open(io.BytesIO(bytes_image))
    img_gray = img.convert('L')
    text = pytesseract.image_to_string(img_gray,lang='nep',config=tessdata_dir_config)
    texts.append(text)
  return texts


model_name = "all-MiniLM-L6-v2"  # Choose a suitable model
embeddings_model = SentenceTransformer(model_name)

# Create a wrapper class to provide the embed_documents method
class EmbeddingsWrapper:
    def __init__(self, model):
        self.model = model

    def embed_documents(self, texts):
        # The function Chroma expects
        return self.model.encode(texts).tolist()

    def embed_queries(self, texts):
        # This is often needed for queries; reusing the same method
        return self.model.encode(texts).tolist()

# Instantiate the wrapper with the SentenceTransformer model
embedding_function = EmbeddingsWrapper(embeddings_model)

import json
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import urllib3
from langdetect import detect, DetectorFactory
from langdetect.lang_detect_exception import LangDetectException

# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

def get_all_pdf_links(base_url,already_crawled_links):
    # Initialize set to store unique PDF links
    pdf_links = set(already_crawled_links)
    visited_urls = set()

    # Function to recursively crawl through URLs
    def crawl(url):
        if url in visited_urls:
            return

        visited_urls.add(url)

        try:
            # Send a GET request with SSL verification disabled
            response = requests.get(url, verify=False)
            soup = BeautifulSoup(response.content, 'html.parser')

            # Find all links on the page
            for link in soup.find_all('a', href=True):
                href = link.get('href')
                abs_link = urljoin(url, href)

                # Check if the link ends with .pdf and is not already in pdf_links
                if abs_link.endswith('.pdf') and abs_link not in pdf_links:
                    pdf_links.add(abs_link)
                    print(f'Found PDF link: {abs_link}')

                # Follow internal links within the same domain
                if abs_link.startswith(base_url) and abs_link not in visited_urls:
                    crawl(abs_link)

        except Exception as e:
            print(f"Error crawling {url}: {e}")

    # Start crawling from the base URL
    crawl(base_url)

    return pdf_links


# def detect_pdf_language(pdf_document):
#     try:
#         full_text = ""
#         for page_num in range(len(pdf_document)):
#             page = pdf_document.load_page(page_num)
#             full_text += page.get_text()
#         pdf_document.close()
#         DetectorFactory.seed = 0  
#         detected_language = detect(full_text)
#         return detected_language
#     except requests.exceptions.RequestException as e:
#         print(f"Error fetching the PDF from {url}: {e}")
#         return False
#     except LangDetectException as e:
#         print(f"Error detecting language: {e}")
#         return False

def detect_pdf_language(doc):
      page = doc.load_page(0)
      pixmap = page.get_pixmap(dpi=300)
      bytes_image = pixmap.tobytes()
      img = Image.open(io.BytesIO(bytes_image))
      img_gray = img.convert('L')
      text_np = pytesseract.image_to_string(img_gray,lang='nep')
      text_en = pytesseract.image_to_string(img_gray,lang='eng')
      if len(text_np) > len(text_en):
          detected_language = 'nep'
      else:
          detected_language = 'eng'

      return detected_language


def np_to_en(texts):
  """
  Converts nepali texts to english
  """
  result = []
  translator = GoogleTranslator(source='ne', target='en')
  for text in texts:
      translated_text = None
      attempts = 0
      while attempts < 3:  # Try up to 3 times
          try:
              translated_text = translator.translate(text)
              break  # Exit the retry loop on success
          except requests.exceptions.RequestException as e:
              print(f"Translation failed for text: {text[:50]}... Attempt {attempts + 1}")
              print(f"Error: {e}")
              attempts += 1
              wait_time = 5 * (2 ** (attempts - 1))  # Exponential backoff: 5s, 10s, 20s
              print(f"Retrying in {wait_time} seconds...")
              time.sleep(wait_time)
          except Exception as e:
              print(f"Unexpected error for text: {text[:50]}: {e}")
              break  # Break on non-retryable errors
      if translated_text is not None:
          result.append(translated_text)
      else:
          result.append("")  # Append empty string on failure
  return result

class PdfLinks(models.Model):
    _name = "pdf.link"
    _description = "pdf Link"
    _rec_name = "link"

    name = fields.Char(string=_('Name'))
    link = fields.Char(string=_('Link'), required=True)
    website_link = fields.Many2one('website.link')
    is_uploaded = fields.Boolean(string=_('Uploaded'))

class WebsiteLink(models.Model):
    _name = "website.link"
    _description = "Website Link"
    _rec_name = "link"

    name = fields.Char(string=_('Name'))
    link = fields.Char(string=_('Link'), required=True)
    is_crawled = fields.Boolean(string=_("Crawled"))
    crawled_time = fields.Datetime(string=_("Crawled Date"), readonly=True)
    crawled_links = fields.One2many('pdf.link','website_link',string=_('Crawled Links'))
    crawled_links_count = fields.Integer(string=_("Unuploaded Link Count") , compute = "_compute_links_count")
    
    @api.depends('crawled_links')
    def _compute_links_count(self):
        for record in self:
            record.crawled_links_count = len(record.crawled_links.filtered(lambda link: not link.is_uploaded))
    
    
    def crawl_website(self):
        for record in self:
            already_crawled_links = [i.link for i in record.crawled_links]
            if not record.is_crawled:
                link = record.link
                crawled_links = get_all_pdf_links(link,already_crawled_links)
                for link in crawled_links:
                    val = {
                        'website_link':record.id,
                        'link':link
                    }
                    self.env['pdf.link'].create(val)
                record.is_crawled = True
                record.crawled_time = datetime.datetime.now()

    def upload_links(self):
        for record in self:
            if record.is_crawled:
                links = record.crawled_links
                print(links)
                for url in links:
                    if url.is_uploaded:
                        continue
                    try:
                        print(url.link)
                        response = requests.get(url.link, verify=False)
                        if not response.ok:
                            continue
                        pdf_document = fitz.open(stream = response.content, filetype="pdf")
                        detected_language = detect_pdf_language(pdf_document)
                        print(detected_language)
                        if detected_language == 'en':
                            temp = []
                            with open('temp.pdf', 'wb') as f:
                                f.write(response.content)

                            # Read the PDF from the temporary file
                            with open('temp.pdf', 'rb') as pdf_file:
                                pdf_reader = PyPDF2.PdfReader(pdf_file)
                                num_pages = len(pdf_reader.pages)
                                for page_num in range(num_pages):
                                    page = pdf_reader.pages[page_num]
                                    page_text = page.extract_text()
                                    temp.append(page_text)
                            self.env['doc.upload'].create({
                                'text_en': '\n'.join(temp),
                                'source': url.link
                            })
                            url.is_uploaded = True
                        else:
                            pdf_document = fitz.open(stream = response.content, filetype="pdf")
                            texts = '\n'.join(np_pdf_to_text(pdf_document))
                            en_texts = np_to_en([texts[i:i+1000] for i in range(0, len(texts), 1000)])
                            self.env['doc.upload'].create({
                                'text_np': texts,
                                'text_en': '\n'.join(en_texts),
                                'source': url.link
                            })
                            url.is_uploaded = True
                            pdf_document.close()

                    except:
                        print('Exception while uploading from PDF links')
                        url.is_uploaded = False


class DataTags(models.Model):
    _name = "data.tag"
    _description = "Data Tags to Store Vector Database"
    _rec_name = "name"

    name = fields.Char(string=_('Name'), required=True)
    vec_db = fields.Char(string=_('Vector_db_name'),compute='_compute_vec_db',store=True)
    choosable = fields.Boolean(string=_('Can be Queried?'))

    @api.model_create_multi
    def create(self, vals):
        for val in vals:
            if val['name']:
                val['vec_db'] = val['name']+'_vec_db'
        CHROMA_PATH = modules.module.get_resource_path(
            'GenAI',
            "static/vec_db"
        )
        CHROMA_PATH = CHROMA_PATH + "/croma_"+val['vec_db']
        page = Document(page_content='', metadata={'source':'null'})
        # CHROMA_PATH = "/Users/sauravthakur/Desktop/odoo_projects/IIDS_mgmt_system/custom_addons/GenAI/static/vec_db/croma_"+val['vec_db']
        db = Chroma.from_documents(
            [page],
            embedding_function,
            persist_directory=CHROMA_PATH,    
            # client_settings=Settings()
        )
        # db.persist()
        res = super(DataTags, self).create(vals)
        return res
        
    