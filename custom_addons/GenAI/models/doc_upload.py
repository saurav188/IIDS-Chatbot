from odoo import models, fields, _, api, modules
from deep_translator import GoogleTranslator
import requests
import time
# from googletrans import Translator, LANGUAGES
import easyocr
import re
import nltk
from nltk.corpus import words
from spellchecker import SpellChecker
import io
from PIL import Image
import base64  
import time  
import json 
import pytesseract

import fitz
from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import shutil
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer

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

        
NEP_DATASET_PATH= modules.module.get_resource_path(
            'GenAI',
            "static",
            'local_dataset_np'
            # +i.vec_db
        )

np_tessdata_dir_config = '--tessdata-dir "' + NEP_DATASET_PATH + '"'    


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



spell = SpellChecker()
# Download the word list if not already done
nltk.download('words')

english_vocab = set(words.words())

def is_english_word(word):
    """
    Check if a word is an English word using nltk's vocabulary.
    """
    return word.lower() in english_vocab and word in spell.correction(word)


def clean_en_text(texts):
    """
    Cleans the input text by removing unnecessary symbols and attempting to extract meaningful information.

    Args:
        text (list of str): The input texts to clean.

    Returns:
        list of str: The cleaned text.
    """
    cleaned_texts = []
    for text in texts:
      # Initial cleaning to remove unwanted characters
      text = re.sub(r'[^\w\s]', ' ', text)  # Replace non-alphanumeric characters with space
      text = re.sub(r'\d+\]', ' ', text)    # Remove isolated digits followed by brackets
      text = re.sub(r'\s+', ' ', text)      # Replace multiple spaces with a single space
      text = text.strip()                   # Remove leading and trailing spaces
      # Split the text into words
      words = text.split()
      text = re.sub(r'(\d+)(\s+\d+){1,}', r'\1', text)

      # Filter out non-English words
      meaningful_words = [word for word in words if is_english_word(word)]

      # Re-join the filtered words into a cleaned text block
      cleaned_texts.append(' '.join(meaningful_words))
    
    return cleaned_texts

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
    text = pytesseract.image_to_string(img_gray,lang='nep',config=np_tessdata_dir_config)
    texts.append(text)
  return texts


class LlamaApi:
  static_token = None
  def __init__(self, username:str, password: str):
    self.auth_url = "https://spiralogics.ai/samchat/auth/token"
    self.api_url = "https://spiralogics.ai/samchat/ask"

    self.static_token = self.get_token(username, password)


  def get_token(self, username, password) -> str:
    """
    This function retrieves an authentication token from an API using the provided username and password.

    Args:
        username: The username for API access.
        password: The password for API access.

    Returns:
        str: The authentication token received from the API.
    """

    data = {"username": username, "password": password}
    response = requests.post(self.auth_url, data=data)

    if response.status_code == 200:
        token = response.json()['access_token']
        return token
    else:
        raise Exception("Failed to obtain token. Status code: {}".format(response.status_code))


  def prompt(self, prompt):

    headers = {"Authorization": f"Bearer {self.static_token}"}
    data = {"prompt": prompt}

    response = requests.post(self.api_url, headers=headers, data=data)
    if response.status_code == 200:
        return response.json().get('response', None)
    else:
        raise Exception("API call failed. Status code: {}".format(response.status_code))

def split_text(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=2000,
        chunk_overlap=300,
        length_function=len,
        add_start_index=True,
    )
    chunks = text_splitter.split_documents(documents)
    print(f"Split {len(documents)} documents into {len(chunks)} chunks.")

    return chunks

llama = LlamaApi(username='Schnapps9108', password='DWAja$XtC43c3*')

# Summarization Prompt

base_prompt = """You are a large language model tasked with creating a detailed report on the documents and extracting relevant information.

**Instructions:**

1. **Read the provided document carefully.** Understand its main points, key arguments, and supporting details.
2. **Generate a concise summary of the document.** Capture the essence of the content in a brief and informative manner.
3. **Identify and list all relevant information.** This may include:
    - Key facts, figures, and statistics
    - Names of individuals, organizations, or locations
    - Dates, timelines, or historical events
    - Important definitions or concepts
    - Any other information that is crucial to understanding the document

**Document:**

{}

**Response:**

Please provide the following:

* **Summary:** A concise summary of the document.
* **Relevant Information:** A list of all relevant information extracted from the document.
"""




class DocUpload(models.Model):
    _name = 'doc.upload'
    _inherit = ['mail.thread']
    _description = 'model to upload docs and use Llama to communicate with it'
    
    pdf_np = fields.Binary(string=_('PDF')) 
    image_np = fields.Image(string=_('Image'))
    audio_np = fields.Binary(string=_('Audio'))
    text_np = fields.Text(string=_('Text(NP)'))
    pdf_en = fields.Binary(string=_('PDF'))
    image_en = fields.Image(string=_('Image'))
    audio_en = fields.Binary(string=_('Audio'))
    text_en = fields.Text(string=_('Text(EN)'), required=True)
    # prompt = fields.Char(string=_('Prompt'))
    source = fields.Char(string=_('Source'), required=True)
    data_tag = fields.Many2many('data.tag',string=_('Data Category'), required=True)
    vec_db_ids = fields.Char()
    show_commit = fields.Boolean(default=True)
    # answer = fields.Text(string=_('Answer'), default='', readonly=True)
    state = fields.Selection(
        selection=[
            ('pending', 'Pending'),
            ('commited', 'Commited'),
            ('cancel', 'Cancelled'),
        ],
        string='Status',
        required=True,
        copy=False,
        tracking=True,
        default='pending',
    )    

    @api.model_create_multi
    def create(self, vals):
        res = super(DocUpload, self).create(vals)
        res.show_commit = False
        return res    

    def write(self, vals):
        if self.state == 'commited':
            return self
        return super(DocUpload, self).write(vals)

    def unlink(self):
        for record in self:
            if not record.vec_db_ids:
                break
            vec_db_ids = json.loads(record.vec_db_ids)
            for i in record.data_tag:
                CHROMA_PATH = modules.module.get_resource_path(
                    'GenAI',
                    "static/vec_db",
                    'croma_'+i.vec_db
                )
                
                db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)
                db._collection.delete(ids=vec_db_ids)
        return super(DocUpload, self).unlink()


    def action_translate_np_to_en(self):
        for obj in self:
            if obj.text_np:
                nep_text = [obj.text_np[i:i+1000] for i in range(0, len(obj.text_np), 1000)]
                temp = np_to_en(nep_text)
                obj.text_en = '\n'.join(temp)
    
    def action_summarise_np(self):
        self.action_translate_np_to_en()
        for obj in self:
            eng_text = obj.text_en
            # clean_texts = remove_short_lines(texts)
            cleaned_en_text = clean_en_text([eng_text])
            document = '\n'.join(cleaned_en_text)
            prompt = f"{base_prompt.format(document)}"
            answer = llama.prompt(prompt)
            obj.summary = answer.replace('*','')
       
    def action_commit_to_vec_db(self):
        for obj in self:
            page = Document(page_content=obj.text_en, metadata={'source':obj.source})
            chunks = split_text([page])
            ts = time.time()
            temp_ids = ['data_tag_'+str(ts)+str(i) for i in range(1, len(chunks)+1)]
            for i in obj.data_tag:
                CHROMA_PATH = modules.module.get_resource_path(
                    'GenAI',
                    "static/vec_db",
                    'croma_'+i.vec_db
                )
                
                db = Chroma.from_documents(
                    chunks,
                    embedding_function,
                    persist_directory=CHROMA_PATH,    
                    ids = temp_ids
                )
                print('successfull')
            obj.vec_db_ids = json.dumps(temp_ids)
            obj.show_commit = True
            obj.state = 'commited'

    @api.onchange('image_np')
    def _onchage_image_np(self):
        occupied = False
        for obj in self:
            image = obj.image_np
            if image:
                occupied = True
                img = Image.open(io.BytesIO(base64.b64decode(image)))
                result = pytesseract.image_to_string(img,lang='nep',config=np_tessdata_dir_config)
                obj.text_np = result
        if occupied:
            self.action_translate_np_to_en()      

    @api.onchange('image_en')
    def onchage_image_en(self):
        for obj in self:
            print('****')
            image = obj.image_en
            if image:
                img = Image.open(io.BytesIO(base64.b64decode(image)))
                result = pytesseract.image_to_string(img,lang='eng')
                print(result)
                obj.text_en = result   
        
    @api.onchange('pdf_en')
    def _onchage_pdf_en(self):
        for obj in self:
            pdf = obj.pdf_en
            if pdf: 
                docs = fitz.open(stream = io.BytesIO(base64.b64decode(pdf)), filetype='pdf')
                
                all_text = ""

                for page_num in range(len(docs)):
                    page = docs.load_page(page_num)  
                    text = page.get_text()  
                    all_text += text  
                obj.text_en = all_text
    
    @api.onchange('pdf_np')
    def onchage_pdf_np(self):
        occupied = False
        for obj in self:
            pdf = obj.pdf_np
            if pdf: 
                occupied = True
                docs = fitz.open(stream = io.BytesIO(base64.b64decode(pdf)), filetype='pdf')
                texts = np_pdf_to_text(docs)
                
                obj.text_np = '\n'.join(texts)
        if occupied:
            self.action_translate_np_to_en()      
