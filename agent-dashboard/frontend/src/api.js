import axios from 'axios'





const API =axios.create({
    baseURL: "http://localhost:5000",
    withCredentials: true, // send cookies by default
    headers: { 'Content-Type': 'application/json' },
});

export default API;