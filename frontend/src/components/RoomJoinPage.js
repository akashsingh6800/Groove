import React, {Component} from "react";

import { Button,Grid,Typography,TextField,FormControl,FormHelperText,Radio,RadioGroup,FormControlLabel, colors } from "@material-ui/core";
import {Link} from "react-router-dom"

export default class RoomJoinPage extends Component{

    constructor(props){
        super(props);
        this.state={
            roomCode: "",
            error: ""
        }

        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleJoinRoom = this.handleJoinRoom.bind(this)
    }
    handleInputChange(e){
        this.setState({roomCode: e.target.value})
    }
    handleJoinRoom(){

        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: this.state.roomCode
            })
        
        }

        fetch("/api/join",requestOptions)
        .then(response=>{
            if(response.ok){
                this.props.navigate(`/room/${this.state.roomCode}`)
            }
            else{
                this.setState({error:"Room not found."})
            }
        }).catch(error=>{
            console.log(error)
        })
        
    }

    render(){
        return(<Grid container spacing={1}>
            <Grid item xs={12} align="center">
                <Typography variant="h4" component="h4">
                 Join a Room 
                 </Typography>
            </Grid>

            <Grid item xs={12} align="center">
                <TextField
                    error={this.state.error}
                    label="Code"
                    placeholder="Enter a Room Code"
                    value={this.state.roomCode}
                    helperText = {this.state.error}
                    variant="outlined"
                    onChange={this.handleInputChange}/>
            </Grid>

            <Grid item xs={12} align="center">
                <Button color="primary" variant="contained" onClick={this.handleJoinRoom}>
                    Join Room
                </Button>
            </Grid>

            <Grid item xs={12} align="center">
                <Button color = "secondary" variant="contrained" to="/" component={Link}>
                        Back
                </Button>
            </Grid>

        </Grid>)
    }

}