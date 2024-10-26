from django.shortcuts import redirect
# from credentials import CLIENT_ID,CLIENT_KEY,REDIRECT_ID
from django.views import View
import urllib.parse
from django.http import JsonResponse
import requests
class GrooveAuthView(View):

    def get(self,request):
        
        params={
            'client_id':'099639c0b2fd4e05af5b729f66fb0069',
            'response_type':'code',
            'redirect_uri':'http://127.0.0.1:8000/groove/callback',
            'scope':'user-read-private user-read-playback-state playlist-modify-public user-modify-playback-state user-modify-playback-state user-read-currently-playing',
            'state': 'your-app-state'
        }

        
        auth_url= f"https://accounts.spotify.com/authorize?{urllib.parse.urlencode(params)}"
        return redirect(auth_url)

class GrooveCallbackView(View):
    
    def get(self,request):
        code = request.GET.get('code')
        state=request.GET.get('state')

        if state!='your-app-state':
            return JsonResponse({'error': 'Invalid state'},status=400)

        if code: 
            token_url='https://accounts.spotify.com/api/token'
            body ={
                'grant_type': 'authorization_code',
                'code':code,
                'redirect_uri':'http://127.0.0.1:8000/groove/callback',
                'client_id':'099639c0b2fd4e05af5b729f66fb0069',
                'client_secret':'0d792755744349aaa9f216c1422251df'

            }

            response = requests.post(token_url,data=body)
            token_data = response.json()
            #return JsonResponse({'Message':'Spotify Authorization','token': token_data})

            if 'access_token' in token_data:

                access_token = token_data['access_token']
                self.request.session['access_token']=access_token
               # return redirect('user/')
                return redirect(f'/current-play/?token={access_token}')
                #return JsonResponse({'Message': 'Spotify Authorizatino Successful', 'token': access_token})
        
            else:
                return JsonResponse({'error': 'Authoization failed'}, status=400)
        
        else:
            return JsonResponse({'error': 'No authoriation code provided'},status=400)

# Create your views here.

class GrooveUserProfileView(View):

    def get(self,request):
        access_token = self.request.session.get('access_token')

        if access_token:

            profile_url = 'https://api.spotify.com/v1/me'
            header={
                'Authorization': f'Bearer {access_token}'
            }

            response = requests.get(profile_url,headers=header)
            user_data=response.json()
            return JsonResponse(user_data)
        else:
            return JsonResponse({'error': 'No access token available'}, status=401)
