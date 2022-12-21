import api from 'axios'

const axios = api.create({ baseURL: process.env.REACT_APP_API_PATH })
api.defaults.headers['Access-Control-Allow-Origin'] = 'https://api.pierong.site'
export default axios
