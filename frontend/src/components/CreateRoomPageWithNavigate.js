import { useNavigate } from "react-router-dom";
import CreateRoomPage from "./CreateRoomPage";
import React, {Component} from "react"

const CreateRoomPageWithNavigate = (props)=>{

    const navigate = useNavigate();
    return <CreateRoomPage {...props} navigate={navigate}/>

}

export default CreateRoomPageWithNavigate