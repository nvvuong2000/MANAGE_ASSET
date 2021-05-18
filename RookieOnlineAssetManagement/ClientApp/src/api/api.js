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
    sortUser: async (sort) => await axios.post('/api/users/sort', sort).then(res => { return res.data })
}

const Asset = {
    //getAllAsset: async () => await axios.get("/api/Asset").then(res => { return res.data }),
    getAllAsset: async (asset, page) => await axios.post(`/api/Asset/mutil-search1?&pageNumber=${page}`,asset).then(res => { return res}),
    getAssetById: async (id) => await axios.get(`/api/Asset/details?id=${id}`).then(res => { return res.data }),
    getStateAssetList: async () => await axios.get(`/api/Asset/getState`).then(res => { return res.data }),
    getAssetHistory: async (id) => await axios.get(`/api/Asset/history?id=${id}`).then(res => { return res.data }),
    addAsset: async (asset) => await axios.post(`/api/Asset`, asset).then(res => { return res.data }),
    updateAsset: async (asset) => await axios.put(`/api/Asset`, asset).then(res => { return res.data }),
    disableAsset: async (id) => 
        await axios.get(`/api/Asset/id?id=${id}`,).then(res => {
            if (res.status === 200) {
               return(true)
            }
            else if (res.status === 204) {
                 return(false);
            }
        }),
    //  filter: async (asset) => await axios.post(`/api/Asset/mutil-search?&pageNumber=${1}`, asset).then(res => { return res.data }),
    //  filter: async (asset) => await axios.post(`/api/Asset/mutil-search`, asset).then(res => { return res.data }),
    }




const Category = {
    getAllCategory: async () => await axios.get("/categorylist").then(res => { return res.data }),
    // getAssetById: async (id) => await axios.post(`/api/Asset/details?id=${id}`).then(res => { return res.data }),
    addCategory: async (category) => await axios.post("/api/Category", category).then(res => { return res.data }),
    // updateUser: async (id, dataInput) => await axios.put(`/api/users/${id}`, dataInput).then(res => { return res.data }),
    // disableUser: async (id) => await axios.put(`/api/users/disable/${id}`).then(res => { return res.data }),
    // getUserLogin: async () => await axios.get('/api/users/infouserlogin').then(res => { return res.data })
}

export default { User, Asset, Category }
