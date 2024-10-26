import React,{Component} from "react";
import { Button,Grid,Typography,TextField,FormControl,FormHelperText,Radio,RadioGroup,FormControlLabel, colors } from "@material-ui/core";




import {withRouter} from "./withrouter";

class Room extends Component{

    constructor(props){
        super(props)

        this.state= {
            votesToSkip: 2,
            guestCanPause: false,
            isHost: false
        }
        
        this.getRoomDetails=this.getRoomDetails.bind(this)
        this.leaveRoom = this.leaveRoom.bind(this)
        this.roomCode = this.props.params.roomCode;
        this.settingsPage=this.settingsPage.bind(this)
        this.getRoomDetails();
        this.musicPlayer=this.musicPlayer.bind(this)
    }

    async getRoomDetails(){
        const response = await fetch('/api/get-room'+'?code='+this.roomCode)
        if(!response.ok){
            this.props.leaveRoomCallback()
            this.props.navigate('/')
           
        }
        else{
            const data = await response.json()
            this.setState({
                votesToSkip: data.vote_to_skip,
                guestCanPause: data.guest_can_pause,
                isHost: data.is_host
            })
        }
        // .then((response)=> {
        //     if(!response.ok){
        //         this.props.leaveRoomCallback()
        //         this.props.navigate('/')
        //         return null
        //     }
        //     return response.json()})
        // .then((data)=>{
        //     console.log(data)
        //     this.setState({
        //         votesToSkip: data.vote_to_skip,
        //         guestCanPause: data.guest_can_pause,
        //         isHost: data.is_host
        //     })
        // })
    }

    async leaveRoom(){
        const requestOptions={
            method:"POST",
            headers:{"Content-Type":"application/json"}
        }
        const response = await fetch('/api/leave-room',requestOptions)

        if(response.ok){
            this.props.leaveRoomCallback()
            this.props.navigate('/')
        }
        else{
            console.log(response)
            console.log("Failed to delete the room")
        }

    }

    settingsPage(){
      this.props.navigate('/settings',{
            state:{
                roomCode:this.state.roomCode,
                votesToSkip:this.state.votesToSkip,
                guest_can_pause:this.state.guestCanPause
            }
        })

    }
    
    async musicPlayer(){
        // const requestOptions={
        //     method:"GET",
        //     headers:{'Content-Type':'application/json'}
        // }
        // const response = await fetch('/groove/get-auth-url',requestOptions)
        window.location.href = '/groove/get-auth-url/';
        console.log("Hi heloo or thank you")
    }



render(){

    return (

        <Grid container spacing={1}>

            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">

                    RoomCode: {this.roomCode}

                </Typography>

            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h5">
                    Vote to Skip : {this.state.votesToSkip}
                </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h5">
                    Are you a Host?: {this.state.isHost ? "Yes" : "No"}
                </Typography>
            </Grid>
            

            <Grid item xs={12} align="center">
                <Typography variant="h3" component="h5">
                    Guest Can Pause : {this.state.guestCanPause ? "Yes": "No"}
                </Typography>
            </Grid>
            

                <Grid item xs={12} align="center">
                    <Button variant="contained" color="primary" onClick={this.leaveRoom}>
                            Leave Room
                    </Button>
                </Grid>

                <Grid item xs={12} align="center">
                    <Button variant ="contained" color="secondary" onClick={this.settingsPage}>
                            Settings
                    </Button>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant ="contained" color="secondary" onClick={this.musicPlayer}>
                            Join & Groove
                    </Button>
                </Grid>
            </Grid>
        </Grid>
    )
}

};

export default withRouter(Room);