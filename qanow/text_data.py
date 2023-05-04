import openai
import nltk
from nltk.corpus import stopwords
import numpy as np
import os
import docx2txt
import pypdf

from .models import Class

# Set OpenAI API key
openai.api_key = os.environ["OPENAI"]

# Function to strip text from different file formats
def strip_text(file):
    filename = file.name

    # If the file is a .txt
    if filename.lower().endswith(".txt"):
        filetext = file.read().decode("utf-8")
        # Process the filetext as needed

    # If the file is a .docx
    elif filename.lower().endswith(".docx"):
        filetext = docx2txt.process(file)
        # Process the filetext as needed

    # If the file is a .pdf
    elif filename.lower().endswith(".pdf"):
        filetext = ""
        # Process the filetext as needed

    return filetext

# Function to generate response from OpenAI API based on given question and context
def context_completion(question, context):
    aiprompt = context + "Q:" + question

    response = openai.Completion.create(
        model="text-davinci-003",
        prompt=aiprompt,
        max_tokens=256,
        temperature=1
    )

    airesponse = response['choices'][0]['text']

    return airesponse

# Function to create embeddings using OpenAI API for a given text input
def embedding_create(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )

    vector = response['data'][0]['embedding']

    return vector

# Function to calculate the similarity score between two vectors
def similarity_score(postvector, dbvector):
    similarity_score = np.dot(postvector, dbvector)
    return similarity_score

# Function to process text and get a list of post IDs that are similar to the input posttext
def process_text(posttext, class_id):
    returnlist = []

    post_embedding = embedding_create(posttext)
    postvector = np.array(post_embedding)

    class_instance = Class.objects.get(id=class_id)
    posts = class_instance.posts.all()

    for post in posts:
        if not post.textData:
            continue
        embedding = post.textData.embedding
        score = similarity_score(postvector, embedding)
        if (score > .85):
            returnlist.append(post.id)

    return returnlist

# Function to process text from files and return a list of responses
def process_file_text(posttext, class_id):
    returnlist = []

    post_embedding = embedding_create(posttext)
    postvector = np.array(post_embedding)

    class_instance = Class.objects.get(id=class_id)
    files = class_instance.files.all()  # Retrieve all the files associated with the class

    print(files)
    for file in files:
        if not file.embedding:
            continue
        embedding = file.embedding
        print("embedd made")
        score = similarity_score(postvector, embedding)
        print(score)
        if score > 0.70: #TODO only show highest scored answer
            returnlist.append(context_completion(posttext, strip_text(file.file)))

    return returnlist
