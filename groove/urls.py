from django.urls import path 
from .views import GrooveAuthView, GrooveUserProfileView, GrooveCallbackView


urlpatterns = [
    path('get-auth-url/',GrooveAuthView.as_view()),
    path('callback',GrooveCallbackView.as_view()),
    path('user/',GrooveUserProfileView.as_view())
]

#mongodb+srv://akashsingh6800:XDn3mW3y9ENtgnFm@cluster0.r0pwi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
