from django.db import models
import string 
import random
# Create your models here.

def generate_unique_code():
    length = 8
    
    while True:
        code = ''.join(random.choices(string.ascii_uppercase, k=length))

        if Room.objects.filter(code=code).count() ==0 :
            break

    return code


class Room(models.Model):
    code = models.CharField(max_length=8,default=generate_unique_code,unique=True)
    host = models.CharField(max_length=50)
    guest_can_pause = models.BooleanField(null=False,default=False)
    vote_to_skip = models.IntegerField(null=False,default=1)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Room {self.code} hosted by {self.host}"

class Guest(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE, related_name="guests")
    username = models.CharField(max_length=50)
    joined_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.username} joined Room{self.room.code}"
