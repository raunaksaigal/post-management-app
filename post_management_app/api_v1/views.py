from django.shortcuts import render
from rest_framework.response import Response
from django.http import HttpResponse
from rest_framework.views import APIView
from .serializer import PostModelSerializer
from django.core.paginator import Paginator, EmptyPage
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import PostModel
from rest_framework import status


"""
user-post view
general_post view

"""

class PostRetrieve(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]
    def get(self, req, *args, **kwargs):
        posts = PostModel.objects.all().order_by("id").reverse()
        perpage = req.query_params.get('perpage', default=20)
        
        page = req.query_params.get('page', default=1)
        paginator = Paginator(posts, per_page=perpage)
        try:
            posts = paginator.page(number=page)
        except EmptyPage:
            posts=[]
        serialized_post = PostModelSerializer(posts, many=True)
        return Response(serialized_post.data, status=status.HTTP_200_OK)
    def post(self, req, id, *args, **kwargs):
        try:
            post = PostModel.objects.get(pk=id)
            serialized_post_o = PostModelSerializer(post)
            like = int(serialized_post_o.data['likes']) + 1
            data = {"likes":like}
            serialized_post = PostModelSerializer(post, data=data, partial=True)

            # print("hi1")
            
            if serialized_post.is_valid():
                # print("hi2")
                serialized_post.save()
                return Response(f"liked {serialized_post.data}", status=status.HTTP_201_CREATED)
            return Response(serialized_post.errors, status=status.HTTP_400_BAD_REQUEST)
            
        except PostModel.DoesNotExist:
            return Response("Post not found",status=status.HTTP_404_NOT_FOUND)

    

        # return Response("Hi", status=200)

class UserPostRetrieve(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self,req, *args, **kwargs):
        posts = PostModel.objects.filter(username=req.user)
        perpage = 5
        # perpage = req.query_params.get('perpage', default=2)
        page = req.query_params.get('page', default=1)
        paginator = Paginator(posts, per_page=perpage)
        try:
            posts = paginator.page(number=page)
        except EmptyPage:
            posts=[]
        serialized_post = PostModelSerializer(posts, many=True)
        return Response(serialized_post.data, status=status.HTTP_200_OK)

class PostCrud(APIView):
    authentication_classes = [TokenAuthentication, SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, req, id, *args, **kwargs):
        try:
            post = PostModel.objects.get(pk=id)
            serialized_post = PostModelSerializer(post)
            print(serialized_post.data['username'], req.user)
            if serialized_post.data['username'] == f"{req.user}":
                return Response(serialized_post.data, status=status.HTTP_200_OK)
            return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
            
        except:
            return Response("Post not found",status=status.HTTP_404_NOT_FOUND)

    def post(self, req, *args, **kwargs):
        data = req.data.copy()
        data['username'] = req.user.username
        serialized_post = PostModelSerializer(data=data)
        # serialized_post.object.username=req.user

        if serialized_post.is_valid():
            # serialized_post.save(username=req.user)
            serialized_post.save()
            return Response(f"created {serialized_post.data}", status=status.HTTP_201_CREATED)
        return Response(serialized_post.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, req, id, *args, **kwargs):
        try:
            post = PostModel.objects.get(pk=id)
            serialized_post_o = PostModelSerializer(post)
            serialized_post = PostModelSerializer(post, data=req.data, partial=True)
            # serialized_post.data['likes'] = serialized_post_o.data['likes']
            # print("hi1")
            if serialized_post_o.data['username'] == f"{req.user}":
                if serialized_post.is_valid():
                    # print("hi2")
                    serialized_post.save()
                    return Response("created", status=status.HTTP_201_CREATED)
                return Response(serialized_post.errors, status=status.HTTP_400_BAD_REQUEST)
            return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
            
        except PostModel.DoesNotExist:
            return Response("Post not found",status=status.HTTP_404_NOT_FOUND)
    
    def delete(self, req, id, *args, **kwargs):
        try:
            post = PostModel.objects.get(pk=id)
            serialized_post = PostModelSerializer(post)
            if serialized_post.data['username'] == f"{req.user}":
                post.delete()
                return Response("deleted", status=status.HTTP_202_ACCEPTED)
            return Response("Unauthorized", status=status.HTTP_401_UNAUTHORIZED)
            
        except:
            return Response("Post not found",status=status.HTTP_404_NOT_FOUND)
    


# Create your views here.
