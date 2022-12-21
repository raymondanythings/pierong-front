import api from 'axios'
import { Tokens } from 'libs/type'

const axios = api.create({ baseURL: process.env.REACT_APP_API_PATH })
// api.defaults.headers['Access-Control-Allow-Origin'] = 'https://api.pierong.site'

export const getToken = async ({ type, code }: { type?: string | null; code?: string | null }) => {
	const { data: response } = await axios.post<Tokens>(`/login/${type}`, { code })
	return response
}

export default axios
