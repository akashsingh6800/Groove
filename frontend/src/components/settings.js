import React,{useState, useEffect} from "react";
import { Checkbox,Button,Grid,Typography,TextField,FormControl,FormHelperText,Radio,RadioGroup,FormControlLabel, colors } from "@material-ui/core";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Settings(){
    const location = useLocation();
    const navigate = useNavigate()
    const {roomCode,votesToSkip,guest_can_pause} = location.state || {}
    // console.log("Before default value")
    // console.log(roomCode,votesToSkip,guest_can_pause)
    // console.log(location.state)
    // console.log("After default value")

    const [newVotesToSkip, setNewVotesToSkip] = useState(votesToSkip)
    const [newGuestCanPause,setGuestCanPause] = useState(guest_can_pause)
    const handleVotesToSkip = (e)=>{
        // console.log(e)
        setNewVotesToSkip(e.target.value)
    }

    const  handleGuestCanChangeBox=(e)=>{
        setGuestCanPause(e.target.checked)
    }

    const updateRoom= async ()=>{
       
        const requestOptions = {
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({
                vote_to_skip: newVotesToSkip,
                guest_can_pause: newGuestCanPause
            })

        }
        console.log(requestOptions.body)

        const response = await fetch('/api/update-room',requestOptions)

        if(response.ok){
            console.log("Room got update successfully")
            navigate('/')
        }

        else{
            console.log("Room Update failed")
        }

    }


    //const { roomCode, votesToSkip, isHost, guestCanPause, leaveRoom } = props;
    return (
        <Grid container spacing={1}>

            <Grid item xs={12} align="center">
                <Typography>

                    RoomCode:{roomCode}

                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <Typography>
                    <TextField
                        type="number"
                        label="Votes to Skip"
                        value={newVotesToSkip}
                        onChange={handleVotesToSkip}
                    />
            

                </Typography>
            </Grid>

            {/* <Grid item xs={12} align="center">
                <Typography>
                    Are you a Host?: 
                </Typography>
            </Grid> */}
            

            {/* <Grid item xs={12} align="center">
                <Typography>
                    <TextField
                    type="string"
                    label = "Guest can pause"
                    value={newGuestCanPause}
                    onChange={handleGuestCanChangeBox}
                    />
                </Typography>
            </Grid> */}
            
            <Grid item xs={12} align ="center">
            <div>
                <FormControlLabel
                control={
                    <Checkbox 
                  
                    checked={newGuestCanPause}
                    onChange={handleGuestCanChangeBox}
                    color="primary"
                    />
                }
                label = "Guest Can pause"
                />
            </div>
            </Grid>

            <Grid item xs={12} align="center">
                    <Button variant ="contained" color="primary" onClick={updateRoom}>
                            Update Settings
                    </Button>
                </Grid>
            </Grid>
    )

}

export default Settings