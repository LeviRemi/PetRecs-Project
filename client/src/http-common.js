import axios from "axios";

export default axios.create({
    // baseURL can be changed depending on where API is located on server
    baseURL: (process.env.NODE_ENV === "production")? "https://petrecs.herokuapp.com/api" : "http://localhost:5000/api",
    headers: {
        "Content-type": "application/json"
    },
    withCredentials: true
});
