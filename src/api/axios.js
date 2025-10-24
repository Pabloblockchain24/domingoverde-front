/*import dependencies*/
import axios from "axios";

const instance  = axios.create({
    /* production mode*/
    baseURL: "https://domingoverde-back.vercel.app/api",

    /* development mode*/
    //baseURL: "http://localhost:4000/api",
    withCredentials: true
})

export default instance
