import axios from 'axios' 

const API = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL
})
API.interceptors.request.use(request => {
    if(localStorage.getItem(process.env.REACT_APP_STORAGE_NAME)){
        const user = JSON.parse(localStorage.getItem(process.env.REACT_APP_STORAGE_NAME))
        request.headers.Authorization = `Bearer ${user.token}` 
    }
    return request
})
export default API