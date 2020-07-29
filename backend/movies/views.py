from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

#Model requirements
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

#Reading files
df = pd.read_csv('./edited_rating.csv')
movies2 = pd.read_csv('./edited_movies.csv')
links = pd.read_csv('./edited_links.csv')

#Fixing parameters
N = df.userId.max() + 1 # number of users
M = df.movie_idx.max() + 1 # number of movies
    # split into train and test
df = shuffle(df, random_state = 12)
cutoff = int(0.80*len(df))
df_train = df.iloc[:cutoff]
df_test = df.iloc[cutoff:]
    # initialize variables
K = 10 # latent dimensionality
mu = df_train.rating.mean()
epochs = 10

#Building Keras Model
u = Input(shape=(1,))
m = Input(shape=(1,))
u_embedding = Embedding(N, K)(u) # (N, 1, K)
m_embedding = Embedding(M, K)(m) # (N, 1, K)
u_embedding = Flatten()(u_embedding) # (N, K)
m_embedding = Flatten()(m_embedding) # (N, K)
x = Concatenate()([u_embedding, m_embedding]) # (N, 2K)
    # the neural network
x = Dense(400)(x)
x = Activation('relu')(x)
x = Dense(1)(x)
model = Model(inputs=[u, m], outputs=x)
model.compile(
  loss='mse',
  # optimizer='adam',
  # optimizer=Adam(lr=0.01),
  optimizer=SGD(lr=0.08, momentum=0.9),
  metrics=['mse'],
)
print("Movies model: ",model.summary())

model.load_weights('./weights_movies.h5')

#Movie Embeddings model
intermediate_layer_model = Model(inputs=model.get_layer('input_4').input, outputs = model.get_layer('embedding_1').output)

# Create your views here.
def index(request):
    return HttpResponse('<h1>Index</h1>')


@csrf_exempt
def getMoviePreference(request):
    if request.method == "POST":
        data = json.loads(request.body)
        print("obtained response is ", data['id'])
        movie_imdb =  data['id']
        if movie_imdb is not None:
            print("Received imdb ids: ", movie_imdb)
            # movie_imdb = np.array(movie_imdb)
            usrc = imdbNoFormat(movie_imdb)
            # print("After imdbNoFormat: ", usrc)
            usrc = imdbToidx(usrc)
            # print("After imdbToidx: ", usrc)
            user_choice_embeddings = intermediate_layer_model.predict(x = usrc)
            user_choice_embeddings = user_choice_embeddings.reshape(len(usrc),10)
            user_choice_bias = np.array([5 for temp in range(len(usrc))])

            user_embedding, residuals, rank, s = np.linalg.lstsq(user_choice_embeddings,user_choice_bias, rcond=-1)
            user_embedding = user_embedding.reshape(1, 10)

            ls = sorted(getListOfUniqueIdx())

            movie_embeddings = intermediate_layer_model.predict(x = ls).reshape(len(ls), 10).T
            # print(np.matmul(user_embedding, movie_embeddings).shape)
            predicted_ratings = np.matmul(user_embedding, movie_embeddings)

            recommendation_dict = {}
            for i, temp in enumerate(predicted_ratings[0]):
                recommendation_dict[i] = temp
            recommendation_dict = sorted(recommendation_dict.items(), key = lambda x: x[1], reverse = True)
            # print(recommendation_dict)

            recommend_idx = []
            i = 0
            for k in recommendation_dict:
                recommend_idx.append(k[0])
                i += 1
                if i > 10:
                    break
            
            recommend_imdb = imdbWithFormat(idxToimdb(recommend_idx))
            recommend_imdb = removeChoices(recommend_imdb, movie_imdb)
            return JsonResponse(recommend_imdb, safe = False)
        else:
            return HttpResponse('<h1>Issue with array sent</h1>')

    return HttpResponse('<h1>POST your movie preferences</h1>')

def removeChoices(recommend_imdb, movie_imdb):
    array = []
    for t in recommend_imdb:
        if t not in movie_imdb:
            array.append(t)
    return array


def getListOfUniqueIdx():
  unique_movie_set = list(int(x) for x in set(movies2.movie_idx.values) if str(x) !='nan')
  return unique_movie_set

def imdbWithFormat(ids):
    array = []
    for temp_id in ids:
        temp_id = '%07d'%(temp_id)
        temp_id = "tt"+ str(temp_id)
        array.append(temp_id)
    return array

def imdbNoFormat(ids):
    array = []
    for temp_id in ids:
        temp_id = temp_id[2:]
        print("temp_id ", temp_id)
        array.append(int(temp_id))
    return array


def imdbToidx(id):
    is_id = links.imdbId.isin(id)
    result = links[is_id]
    return result['movie_idx'].values.tolist()

def idxToimdb(id):
    is_id = links.movie_idx.isin(id)
    result = links[is_id]
    return result['imdbId'].values.tolist()

