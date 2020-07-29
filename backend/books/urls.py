from django.urls import path
from . import views

urlpatterns = [
    path('bookPreference', views.getBookPreference, name="book_preferences")
]