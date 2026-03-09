from django.db import models
from apps.dresses.models import Dress


class Booking(models.Model):
    dress = models.ForeignKey(Dress, on_delete=models.CASCADE)
    customer_name = models.CharField(max_length=200)
    mobile_number = models.CharField(max_length=20)
    place = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField()
    total_days = models.IntegerField()
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    returned = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer_name} - {self.dress.name}"