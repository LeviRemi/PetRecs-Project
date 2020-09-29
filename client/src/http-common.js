import axios from "axios";

export default axios.create({
    // baseURL can be changed depending on where API is located on server
    baseURL: "http://petrecs.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});