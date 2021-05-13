import axios from 'axios'

axios.defaults.baseURL=process.env.REACT_APP_API

const User={
    getAllUsers:async()=>await axios.get("/api/users").then(res=>{return res.data}),
    getUserById:async(id)=>await axios.get(`/api/users/${id}`).then(res=>{return res.data}),
    addUser:async(user)=>await axios.post("/api/users",user).then(res=>{return res.data}),
    updateUser:async(id,dataInput)=>await axios.put(`/api/users/${id}`,dataInput).then(res=>{return res.data}),
    disableUser:async(id)=>await axios.put(`/api/users/disable/${id}`).then(res=>{return res.data}),
    getUserLogin:async()=>await axios.get('/api/users/infouserlogin').then(res=>{return res.data}),
    searchUser:async(search)=>await axios.post('/api/users/search',search).then(res=>{return res.data}),
    sortUser:async(sort)=>await axios.post('/api/users/sort',sort).then(res=>{return res.data})
}

export default {User}
