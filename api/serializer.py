from rest_framework import serializers
from .models import Room
from .models import Guest


class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model=Guest 
        fields=['id','username','joined_at']

class RoomSerializer(serializers.ModelSerializer):
    guests = GuestSerializer(many=True,read_only=True)

    class Meta:
        model = Room 
        fields =['code','host','guest_can_pause','vote_to_skip','created_at','guests']


# class RoomSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Room
#         fields = ('id', 'code', 'host', 'guest_can_pause','vote_to_skip','created_at')
        

# class CreateRoomSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Room
#         fields = ('guest_can_pause', 'vote_to_skip')

# class UpdateRoomSettingsSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Room
#         fields = ('vote_to_skip','guest_can_pause')
        
#         def is_valid(self,data):

#             if data['vote_to_skip']<1:
#                 raise serializers.ValidationError({
#                     'vote_to_skip': 'Votes to skip must be atleast 1.'
#                 })
#             return data
    

        
