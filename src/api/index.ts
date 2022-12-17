import api from 'axios'

const axios = api.create({ baseURL: process.env.REACT_APP_API_PATH })

export default axios
