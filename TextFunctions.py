import os
import openai
import numpy as np

openai.api_key = "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"


def create_embeds(textinput):
    response = openai.Embedding.create(
        input=textinput,
        model="text-embedding-ada-002"
    )

    embedding_a = response['data'][0]['embedding']
    #embedding_b = response['data'][1]['embedding']
    #embedding_c = response['data'][2]['embedding']
    #embedding_d = response['data'][3]['embedding']
    #embedding_e = response['data'][4]['embedding']

    #vectors = [embedding_a, embedding_b, embedding_c, embedding_d, embedding_e]

    # similarity_score = np.dot(embedding_a, embedding_b)
    # similarity_score2 = np.dot(embedding_a, embedding_c)
    # print(similarity_score)
    # print(similarity_score2)

    return embedding_a


def main():
    questions = ["Does anyone know when office hours are?", "Any tips for question 15?",
                 "How do I do question 12?", "How do I install NLTK?", "Do we have class tomorrow?"]
    embeddings = []

    query = "How do I finish question 8?"

    for i in range(len(questions)):
        print(questions[i])
        embeddings.append(create_embeds(questions[i]))

    query_embed = create_embeds(query)

    print("Close questions:\n")

    for i in range(len(questions)):
        similarity_score = np.dot(query_embed, embeddings[i])
        #print(questions[i])
        #print(similarity_score)

        if similarity_score > .85:
            print(questions[i])
            print(similarity_score, "\n")


if __name__ == "__main__":
    main()
