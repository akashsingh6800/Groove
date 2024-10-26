import React,{Component} from "react";
import CreateRoomPageWithNavigate from "./CreateRoomPageWithNavigate";
import Room from './Room';
import { BrowserRouter as Router, Routes, Route, Link, Redirect, Navigate } from "react-router-dom";
import RoomJoinPageWithNavigate from "./RoomJoinPageNavigate";
import Settings from "./settings";
import PlayMusic from "./play-music"

import { Button,Grid,Typography,TextField,FormControl,FormHelperText,Radio,RadioGroup,FormControlLabel, colors } from "@material-ui/core";


export default class HomePage extends Component{

    constructor(props){
        super(props);
        this.state={
            roomCode:''
        }
       // this.renderHomePage = this.renderHomePage.bind(this)
       this.clearRoomCode=this.clearRoomCode.bind(this)
    }

    async componentDidMount(){
        const response = await fetch('/api/user-in-room');
        const data = await response.json();
        console.log(data.code)
        
        if (data.code) {
            this.setState({ roomCode: data.code });
        } else {
            this.setState({ roomCode: null });
        }
    }
    clearRoomCode(){
        this.setState({
            roomCode:null
        })
    }

    renderHomePage(){
        return (
            <Grid container spacing={1}>
                <Grid item xs={12} align="center">
                    <Typography variant="h3" component="h3">
                        Home Page
                    </Typography>
                    <Grid item xs={12} align ="center">
                        <Button color="primary" variant = "contained" to="/join" component={Link}>
                            Join a room
                        </Button>
                    </Grid>

                    <Grid item xs={12} align ="center">
                        <Button color="secondary" variant="contained" to="/create" component={Link}>
                            Create a room
                        </Button>
                    </Grid>
                </Grid>

            </Grid>
        )
    }

    render(){
        return (<Router> 
            <Routes>
             <Route
                path="/"
                element ={
                    this.state.roomCode ? (<Navigate to={`room/${this.state.roomCode}`}/>) : (this.renderHomePage())
                }
             />

                    <Route path="/join" element={<RoomJoinPageWithNavigate/>}/>
                    <Route path="/create" element={<CreateRoomPageWithNavigate/>}/>
                    <Route path="/room/:roomCode" element={<Room leaveRoomCallback={this.clearRoomCode}/>}/>
                    <Route path="/settings" element={<Settings/>} />
                    <Route path="/play-music" element={<PlayMusic/> }/>
                    <Route path="/current-play" element={<PlayMusic/> }/>

                </Routes>
            </Router>
        )
    }
}