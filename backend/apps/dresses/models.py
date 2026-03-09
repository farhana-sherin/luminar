from django.db import models
from apps.categories.models import Category


class Dress(models.Model):
    code = models.CharField(max_length=100, unique=True)
    name = models.CharField(max_length=200)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    color = models.CharField(max_length=100)
    image = models.ImageField(upload_to='dress_images/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return  f"{self.name} ({self.code})"