# -*- coding: utf-8 -*-
import odoo.http as http
from odoo.http import request
from werkzeug.wrappers import Request, Response
import json
import requests
import os
from odoo import modules

from langchain.docstore.document import Document
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import Chroma
from langchain_community.embeddings import HuggingFaceEmbeddings
import shutil
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
from langchain.prompts import ChatPromptTemplate
from autocorrect import Speller


spell = Speller(lang='en')
def spell_checker(sentence):
  result = []
  for word in sentence.split(' '):
    result.append(spell(word))
  return ' '.join(result)

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
    data = {
        "prompt": prompt,
        "temperature":0.5
        }

    response = requests.post(self.api_url, headers=headers, data=data)
    if response.status_code == 200:
        return response.json().get('response', None)
    else:
        raise Exception("API call failed. Status code: {}".format(response.status_code))


# llm
llama = LlamaApi(username=os.environ['llama_username'], password=os.environ['llama_password'])
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
        return self.model.encode(texts).tolist()

    def embed_query(self, text):
        return self.model.encode(text).tolist()

# Instantiate the wrapper with the SentenceTransformer model
embedding_function = EmbeddingsWrapper(embeddings_model)
CROMA_PATH_DRIVE = '/content/drive/MyDrive/Croma_DB/croma_2000'

# Context Prompt
PROMPT_TEMPLATE = """
Answer the question based only on the following context without telling the user that you are looking at a context. If there's no mention of the answer in the context reply with I don't know.:

{context}

Conversation:
{conversation}
---

Answer the question based on the above context: {question}
"""


def format_conversation(conversation_list):
    formatted_conversation = ""
    for entry in conversation_list:
        if "user" in entry:
            formatted_conversation += f"user: {entry['user']}\n"
        if "AI" in entry:
            formatted_conversation += f"AI: {entry['AI']}\n"
    return formatted_conversation

class chat_page_controller(http.Controller):
    @http.route('/chat', type='http', auth='user', website=True)
    def show_custom_webpage(self, **kw):
        data_tags = request.env['data.tag'].search_read([('choosable','=',True)],['id', 'name', 'vec_db'])
        
        return http.request.render('GenAI.iids_ai_chat_page', {'tags':data_tags})
      
    @http.route('/chat/ai', type='json', auth='user', website=True, methods=['POST'],  csrf=False)
    def get_ai_response(self, **kw):
        user_input = request.params['user_input']
        data_tag = request.params['data_tag']
        conversation = request.params['conversation']
        
        CHROMA_PATH = modules.module.get_resource_path(
                    'GenAI',
                    "static/vec_db",
                    'croma_' + data_tag +'_vec_db'
                    # +i.vec_db
                )
        
        db = Chroma(persist_directory=CHROMA_PATH, embedding_function=embedding_function)

        question = spell_checker(user_input)
        
        sources = []
        results = db.similarity_search_with_relevance_scores(question, k=3)
        
        if len(results) == 0 or results[0][1] < 0.1: # value 0.1 should be higher but in this case to test it is kept less recommended 0.7
            answer = f"I don't know"
        else:
            context_text = "\n\n---\n\n".join([doc.page_content for doc, _score in results])

            prompt_template = ChatPromptTemplate.from_template(PROMPT_TEMPLATE)
            prompt = prompt_template.format(context=context_text, conversation = format_conversation(conversation), question=question)
            print(prompt)
            answer = llama.prompt(prompt)

        if not answer.contains("I don't know"):
            sources = [doc.metadata.get("source", None) for doc, _score in results]

            
        
        data={
            'ai_response':answer,
            'sources':sources
        }

        return json.dumps(data)