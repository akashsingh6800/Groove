import React, {useState, useEffect} from 'react';
import { useLocation  } from 'react-router-dom';

const GrooveMusicPlayer =()=>{
 
    const location = useLocation();
    const [accessToken, setAccessToken] = useState(null);
    const [currentTrack, setCurrentTrack] = useState(null);

  // Extract the token from the URL


  useEffect(() => {
    currentMusic();
    const interval = setInterval(currentMusic, 10000); // Refresh every 10 seconds

    return () => clearInterval(interval); // Cleanup on unmount
}, [accessToken]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    if (token) {
      setAccessToken(token);
    }
  }, [location.search]);

    const [track, setTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(true)

    const pauseTrack = async() => {
        console.log("Pause Music")
            try{
                const response = await fetch('https://api.spotify.com/v1/me/player/pause',{
                    method:'PUT',
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                });
                if (response.ok){
                    console.log('Track Pause');
                    setIsPlaying(false)
                }
            }
            catch(error){
                console.error('Error playing track', error)
            }
       
        }
    const currentMusic = async()=>{

        console.log(accessToken)
        console.log("Hi")

        const requestOptions={
            method: "GET",
            headers:{
                Authorization: `Bearer ${accessToken}`
            }
        }
        console.log(requestOptions)
        try{
        const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing",requestOptions)

        if(!response.ok){
            throw new Error("Failed to fetch current track")
        }
        const data = await response.json()
        setCurrentTrack(data); 
    }
    catch(error){
        console.log(error)
    } 
}

    const playTrack = async() => {
       console.log("Play Music")

        try{
            const response = await fetch('https://api.spotify.com/v1/me/player/play',{
                method:'PUT',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
                // }, body: JSON.stringify({
                //     uris: ['spotify:track:6rqhFgbbKwnb9MLmUQDhG6'], // Example track URI
                //   })
            });
            if (response.ok){
                console.log('Track Pause');
                setIsPlaying(true)
            }
        }
        catch(error){
            console.log('Error Playing track', error)

        }
   
    }
    if (!currentTrack) {
        return <div>Loading...</div>;
    }
    const items = currentTrack["item"]
    const name = items["name"]
    const artists=items["artists"]
    const album = items["album"]
    const is_playing = items["is_playing"]



    console.log("Before Album")
    console.log(album)
    console.log("After album")


return (
    // <div>
    //     <h2>Groove Music </h2>

    //     <button onClick = {isPlaying? currentMusic: currentMusic}>
    //         {isPlaying ? 'Pause': 'Play'}

    //     </button>

    // </div>
    <div>
    <h2>Now Playing</h2>
    <img src={album.images[0].url} alt={album.name} style={{ width: '200px' }} />
    <h3>{name}</h3>
    <h4>{artists.map(artist => artist.name).join(', ')}</h4>
    <p>Album: {album.name}</p>
    <p>{is_playing ? "Playing" : "Paused"}</p>

      <button onClick = {isPlaying? pauseTrack : playTrack}>
           {isPlaying ? 'Pause': 'Play'}

        </button>
   
    {/* You can add buttons for play, pause, next, previous, etc. here */}
</div>

)

}

export default GrooveMusicPlayer