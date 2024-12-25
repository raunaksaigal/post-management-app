from django.db import models

class PostModel(models.Model):
    title = models.CharField(max_length=100, blank=False)
    body = models.CharField(max_length=10000, blank=False)
    image = models.ImageField((""), upload_to="images/", height_field=None, width_field=None, max_length=None, blank=True)
    username = models.CharField(max_length=100, blank=False)
    # user_id = models.IntegerField()
    likes = models.IntegerField(default=0)
    
    def __str__(self):
        return self.title

 


"""
General View-Post ID, Post Title, Body , Image (Optional), User Details , Likes

"""



# Create your models here.
