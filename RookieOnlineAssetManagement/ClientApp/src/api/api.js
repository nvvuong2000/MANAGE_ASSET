import axios from 'axios'

axios.defaults.baseURL = process.env.REACT_APP_API

const User = {
    getAllUsers: async () => await axios.get("/api/users").then(res => { return res.data }),
    getUserById: async (id) => await axios.get(`/api/users/${id}`).then(res => { return res.data }),
    addUser: async (user) => await axios.post("/api/users", user).then(res => { return res.data }),
    updateUser: async (id, dataInput) => await axios.put(`/api/users/${id}`, dataInput).then(res => { return res.data }),
    disableUser: async (id) => await axios.put(`/api/users/disable/${id}`).then(res => { return res.data }),
    getUserLogin: async () => await axios.get('/api/users/infouserlogin').then(res => { return res.data }),
    searchUser: async (search) => await axios.post('/api/users/search', search).then(res => { return res.data }),
    sortUser: async (sortBy) => await axios.post("/api/users/sort", sortBy).then(res => { return res.data })
}

const Asset = {
    getAllAsset: async () => await axios.get("/api/Asset").then(res => { return res.data }),
    getAssetById: async (id) => await axios.get(`/api/Asset/details?id=${id}`).then(res => { return res.data }),
    getAssetHistory: async (id) => await axios.get(`/api/Asset/history?id=${id}`).then(res => { return res.data }),
}
export default { User, Asset }
