import api from 'axios'
import { Tokens, User } from 'types'
import { Response } from 'types/Response'

const axios = api.create({ baseURL: process.env.REACT_APP_API_PATH })

export const getToken = async ({ type, code }: { type?: string | null; code?: string | null }) => {
	const { data: response } = await axios.post<Response<Tokens & User>>(`/login/${type}`, { code })
	return response
}

export default axios
