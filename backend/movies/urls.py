from django.urls import path
from . import views

urlpatterns = [
    path('moviePreference', views.getMoviePreference, name="movie_preferences")
]