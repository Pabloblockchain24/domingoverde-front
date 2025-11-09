import axios from "./axios"


export const getRByApi = (code) => axios.get(`/r/shortLink/${code}`);
