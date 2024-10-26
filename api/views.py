from rest_framework.views import APIView
from .serializer import RoomSerializer, GuestSerializer
from rest_framework.response import Response
from rest_framework import status
from .model import Room, Guest

class CreateRoomView(APIView):
    serializer_class = RoomSerializer

    def post(self,request,format = None):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            room = serializer.save(host=request.user.username)
            return Response(RoomSerializer(room).data,status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)


class JoinRoomView(APIView):
    def post(self,request,format=None):
        room_code = request.data.get('room_code')
        username = request.data.get('username')

        try:
            room=Room.objects.get(code=room_code)
            guest = Guest.objects.create(room=room,username=username)

            return Response(GuestSerializer(guest).data,status=status.HTTP_201_CREATED)
        
        except Room.DoesNotExist:
            return Response({"error": "Room not found"}, status =status.HTTP_404_NOT_FOUND)













# from django.shortcuts import render
# from rest_framework import generics, status
# from .serializer import RoomSerializer, CreateRoomSerializer, UpdateRoomSettingsSerializer
# from .models import Room
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from django.http import JsonResponse

# class RoomView(generics.ListCreateAPIView):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer

# class JoinRoom(APIView):

#     def post(self,request,format=None):

#         if not self.request.session.exists(self.request.session.session_key):
#              self.request.session.create()

#         code = request.data.get('code')

#         if(Room.objects.filter(code=code).exists()):
#             room=Room.objects.filter(code=code)

#             data = RoomSerializer(room[0]).data 
#             self.request.session['room_code']=code
#             return Response(data,status=status.HTTP_200_OK)
#         return Response({'Bad Request': 'Invalid Room Code'}, status = status.HTTP_404_NOT_FOUND)


# class GetRoom(APIView):
#     serializer_class = RoomSerializer
#     lookup_url_kwarg = 'code'

#     def get(self,request,format=None):
#         code = request.GET.get(self.lookup_url_kwarg)

#         if code != None:
#             room = Room.objects.filter(code=code)

#             if len(room)> 0:
#                 data = RoomSerializer(room[0]).data 
#                 data['is_host'] = self.request.session.session_key == room[0].host

#                 return Response(data, status = status.HTTP_200_OK)
#             return Response({'Bad Request': 'Invalid Room Code.'}, status=status.HTTP_404_NOT_FOUND)
        
#         return Response({'Bad Request': 'Code parameter not found in request'}, status=status.HTTP_400_BAD_REQUEST)



# class CreateRoomView(APIView):
#     serializer_class = CreateRoomSerializer


#     def post(self,request,format = None):
#         serializer = self.serializer_class(data = request.data)
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
        
#         print("hiii")
        
#         print(serializer)
#         if serializer.is_valid():
#             guest_can_pause = serializer.data.get('guest_can_pause')
#             vote_to_skip = serializer.data.get('vote_to_skip')
#             host = self.request.session.session_key
#             queryset=Room.objects.filter(host=host)

#             if queryset.exists():

#                 room = queryset[0]
#                 room.guest_can_pause = guest_can_pause
#                 room.vote_to_skip= vote_to_skip
#                 room.save(update_fields=['guest_can_pause','vote_to_skip'])
#                 self.request.session['room_code']=room.code
#                 return Response(RoomSerializer(room).data, status=status.HTTP_200_OK)

#             else:
#                 room = Room(host=host, guest_can_pause=guest_can_pause, vote_to_skip=vote_to_skip)
                
#                 room.save()
#                 self.request.session['room_code']=room.code
#                 return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# class UserInRoom(APIView):

#     def get(self,request,format=None):
#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
        
#         data ={
#             'code': self.request.session.get('room_code')
#         }
#         return JsonResponse(data, status=status.HTTP_200_OK)

# class LeaveRoom(APIView):

#     def post(self,request,format=None):

#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
        
#         room_code=request.session.get('room_code')

#         if room_code:
#             room=Room.objects.filter(code=room_code).first()

#             if room:
#                 self.request.session.pop('room_code')
#                 if room.host == self.request.session.session_key:
#                     room.delete()
                
                
#                 return Response({"Message": "Room left successfully"}, status=status.HTTP_200_OK)
#             return Response({"Message":"No room found"}, status=status.HTTP_400_BAD_REQUEST)
#         return Response({"Message": "Invalid room bro"}, status=status.HTTP_400_BAD_REQUEST)
    


# class UpdateRoom(APIView):

#     def patch(self,request,format=None):

#         if not self.request.session.exists(self.request.session.session_key):
#             self.request.session.create()
        
#         room_code=request.session.get('room_code')

#         if room_code:
#             room=Room.objects.filter(code=room_code).first()
        
#         else:
#             return Response({"Message":"No room found"}, status = status.HTTP_400_BAD_REQUEST)

#         serializer = UpdateRoomSettingsSerializer(room,data=request.data)

#         if serializer.is_valid():
#             serializer.save()

#             return Response({"Message": "Room settings updated successfully"}, status=status.HTTP_200_OK)

#         else:
#             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
