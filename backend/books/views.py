from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

### Importing packages
import pickle
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.utils import shuffle
from keras.models import Model
from keras.layers import Input, Embedding, Flatten, Dense, Concatenate
from keras.layers import Dropout, BatchNormalization, Activation
from keras.regularizers import l2
from keras.optimizers import SGD, Adam

### Initializing variables
df = pd.read_csv('./Book_rating.csv')
N = len(set(df["userId"].values)) # number of users
M = len(set(df["movie_idx"].values)) # number of movies
df = shuffle(df, random_state = 12)
cutoff = int(0.80*len(df))
df_train = df.iloc[:cutoff]
df_test = df.iloc[cutoff:]
K = 20 # latent dimensionality
mu = df_train["Book-Rating"].mean()
epochs = 15
print("Book Rating Mean: ", mu)

### Creating the model
u = Input(shape=(1,))
m = Input(shape=(1,))
u_embedding = Embedding(N, K)(u) # (N, 1, K)
m_embedding = Embedding(M, K)(m) # (N, 1, K)
u_embedding = Flatten()(u_embedding) # (N, K)
m_embedding = Flatten()(m_embedding) # (N, K)
x = Concatenate()([u_embedding, m_embedding]) # (N, 2K)
# the neural network
x = Dense(248)(x)
x = Dropout(0.5)(x)
x = Activation('relu')(x)
x = Dense(1)(x)
books_model = Model(inputs=[u, m], outputs=x)
books_model.compile(
  loss='mse',
  # optimizer='adam',
  # optimizer=Adam(lr=0.01),
  optimizer=SGD(lr=0.04, momentum=0.9),
  metrics=['mse'],
)
print("Books model: ", books_model.summary())

#Movie Embeddings model
intermediate_books_model = Model(inputs=books_model.get_layer('input_6').input, outputs = books_model.get_layer('embedding_3').output)

books_model.load_weights('./weights_books.h5')

# Create your views here.
@csrf_exempt
def getBookPreference(request):
    if request.method == "POST":
        # data = json.loads(request.body)
        # print("obtained response is ", data['id'])
        # book_isbn = data['id']
        book_isbn = ['6237827973']
        if book_isbn is not None:
            print("Received isbn ids: ", book_isbn)
            book_idx = isbnToidx(book_isbn)
            if len(book_idx)==0 : 
                book_idx = [165240, 10648]
            print("Book_idx: ", book_idx)
            user_choice_embeddings = intermediate_books_model.predict(x = book_idx)
            user_choice_embeddings = user_choice_embeddings.reshape(len(book_idx),20)
            user_choice_bias = np.array([5 for temp in range(len(book_idx))])

            user_embedding, residuals, rank, s = np.linalg.lstsq(user_choice_embeddings,user_choice_bias, rcond=-1)
            user_embedding = user_embedding.reshape(1, 20)

            ls = sorted(getListOfUniqueIdx())

            books_embeddings = intermediate_books_model.predict(x = ls).reshape(len(ls), 20).T
            # print(np.matmul(user_embedding, movie_embeddings).shape)
            predicted_ratings = np.matmul(user_embedding, books_embeddings)
            
            recommendation_dict = {}
            for i, temp in enumerate(predicted_ratings[0]):
                recommendation_dict[i] = temp
            recommendation_dict = sorted(recommendation_dict.items(), key = lambda x: x[1], reverse = True)
            # print(recommendation_dict)

            recommend_idx = []
            cnt = 0
            for k in recommendation_dict:
                recommend_idx.append(k[0])
                cnt += 1
                if cnt > 10:
                    break
            recommend_isbn = idxToIsnb(recommend_idx)
            return JsonResponse(recommend_isbn[:10], safe = False)
        else:
            return HttpResponse('<h1>Issue with array sent</h1>')

    return HttpResponse('<h1>POST your movie preferences</h1>')

def getListOfUniqueIdx():
  unique_movie_set = list(int(x) for x in set(df.movie_idx.values) if str(x) !='nan')
  return unique_movie_set

def isbnToidx(id):
    is_id = df.ISBN.isin(id)
    result = df[is_id]
    return result['movie_idx'].values.tolist()

def idxToIsnb(id):
    is_id = df.movie_idx.isin(id)
    result = df[is_id]
    return result['ISBN'].values.tolist()