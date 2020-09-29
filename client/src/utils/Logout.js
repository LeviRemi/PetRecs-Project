import axios from "axios";
import Cookies from "js-cookie";
import {useHistory} from "react-router";
import React from "react";
import HomePage from "../pages/HomePage";

function Logout() {
    
    const history = useHistory();

    // Destroy session
    axios.get("/api/sessions/destroy", { withCredentials: true })
        .then(response=>{
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });

    // Destroy cookie
    Cookies.remove('sessionId');

    history.push("/");

    return (
        <div><HomePage /></div>
    )

}

export default Logout
