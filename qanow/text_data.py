import openai
import nltk
from nltk.corpus import stopwords
import numpy as np

from .models import Class
openai.api_key = "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"

# TODO, figure out how to access the other uploaded documents in the DB. The same API calls should be usable


def syllabus_check(text):
    # Preprocess the text, removing stopwords, numbers, and punctuation and lowercasing all capital letters
    text_tokens = [t.lower() for t in nltk.word_tokenize(
        text) if t.isalpha() and t not in stopwords.words('english')]

    rec_syllabus = 0
    # Recombine the text
    text = ' '.join(text_tokens)
    # print(text)

    if "office hours" in text:
        rec_syllabus = 1

    elif "due date" in text or "due" in text:
        rec_syllabus = 1

    elif "syllabus" in text:
        rec_syllabus = 1

    elif "grading scale" in text:
        rec_syllabus = 1

    elif "attendance" in text:
        rec_syllabus = 1

    elif "schedule" in text:
        rec_syllabus = 1

    return rec_syllabus


# This function takes the text and uses openAI to generate a vector representing the embeddings
# of the meaning of the text. This will be a long list, so it will be saved to the DB as a json object
def embedding_create(text):
    response = openai.Embedding.create(
        input=text,
        model="text-embedding-ada-002"
    )

    vector = response['data'][0]['embedding']

    # print(len(vector))
    # print(vector)

    return vector

# Calculate and return the similarity of both the vector of the post and of the vector in the database


def similarity_score(postvector, dbvector):
    similarity_score = np.dot(postvector, dbvector)
    return similarity_score


# Process function that gets the embeddings and checks if the syllabus should be recommended as well
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

    # returnlist.append(syllabuscheck(posttext))

    return returnlist


# if __name__ == "__main__":
#     vector1 = processtext("When are office hours? I need to talk to the professor")
#     vector2 = processtext("What time are office hours?")
#     print(similarityscore(vector1[0] ,vector2[0]))
