import axios from 'axios'
const API = axios.create({
    baseURL : 'https://devconnect-503v.onrender.com'
})

export default API