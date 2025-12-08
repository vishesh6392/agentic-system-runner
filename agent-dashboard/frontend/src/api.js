import axios from 'axios'





const API =axios.create({
    baseURL: 'https://agentic-system-runner-1.onrender.com',
    withCredentials: true, // send cookies by default
    headers: { 'Content-Type': 'application/json' },
});

export default API;
