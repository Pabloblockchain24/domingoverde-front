/*import axios*/
import axios from "./axios";

/*login user*/
export const loginByApi = (user) => axios.post(`/auth/login`, user);

/*logout user*/
export const logoutByApi = () => axios.post("/auth/logout");

/* verify token*/
export const verifyTokenRequestByApi = () => axios.get("/auth/verify")