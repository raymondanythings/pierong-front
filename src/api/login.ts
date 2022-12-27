import { axios } from 'api'
import api from 'axios'
import { Tokens, User } from 'types'
import { Response } from 'types/Response'

const checkAccessToken = async (token: string) => {
	const res = await axios.get<Response<User & { atk: string }>>('/login/checkAccessToken', {
		headers: {
			'X-ACCESS-TOKEN': token
		}
	})

	return { userInfo: res.data.data, atk: res.data.data.atk }
}

const checkRefreshToken = async (refreshToken: string) => {
	const { data: { data: { atk = null } = {} } = {} } = await axios.post<{ code: string; data: { atk: string } }>(
		'/login/reissue',
		{},
		{
			headers: {
				'X-ACCESS-TOKEN': refreshToken
			}
		}
	)
	if (atk) {
		localStorage.setItem('X-ACCESS-TOKEN', atk)
	}

	return atk || null
}

const getToken = async ({ type, code, url }: { type?: string | null; code?: string | null; url: string }) => {
	const { data: response } = await axios.post<Response<Tokens & { userInfo: User }>>(`/login/${type}`, { code, type, url })
	return response
}
export { checkAccessToken, getToken, checkRefreshToken }
