from django.urls import path
from .views import PostRetrieve, UserPostRetrieve,PostCrud

urlpatterns = [
    path('posts/', PostRetrieve.as_view()),
    path('posts/<int:id>', PostRetrieve.as_view()),
    path('user/posts/', UserPostRetrieve.as_view()),
    path('user/post/', PostCrud.as_view()),
    path('user/post/<int:id>', PostCrud.as_view()),
    # path('user/', .as_view()),
    # localhost:8000/api/v1/

]
