import { useNavigate } from "react-router-dom";
import RoomJoinPage from "./RoomJoinPage";
import React, {Component} from "react"

const RoomJoinPageWithNavigate = (props)=>{

    const navigate = useNavigate();
    return <RoomJoinPage {...props} navigate={navigate}/>

}

export default RoomJoinPageWithNavigate