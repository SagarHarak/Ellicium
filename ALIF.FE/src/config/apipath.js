import axios from 'axios'
const client = axios.create({
    headers: {
        Authorization: `Bearer ${localStorage.getItem("accesstoken")}`
    },
    baseURL: 'http://localhost:3000/api'
})
export default client
