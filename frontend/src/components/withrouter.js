import {useParams} from "react-router-dom";
import React,{Component} from "react";
import { useNavigate } from "react-router-dom";


export const withRouter = (Component) =>{

    function Wrapper(props) {
        const params = useParams();
        const navigate=useNavigate()

        return <Component {...props} params ={params} navigate={navigate}/>;
    }
    return Wrapper;
}