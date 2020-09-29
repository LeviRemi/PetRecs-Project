import axios from "axios";
import Cookies from "js-cookie";

function Logout() {

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

    // Refresh page
    setTimeout(function() {
        window.location.reload();
    }, 100);

}

export default Logout
