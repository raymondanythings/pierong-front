import { axios } from 'api'
import api from 'axios'
import { Tokens, User } from 'types'
import { Response } from 'types/Response'

const checkAccessToken = async (token: string) => {
	const res = await axios.get<Response<User & { atk?: string }>>('/login/checkAccessToken', {
		headers: {
			'X-ACCESS-TOKEN': token
		}
	})
	const {
		data: {
			data: { ...userInfo },
			atk
		}
	} = res
	return { userInfo, atk }
}

const checkRefreshToken = async (refreshToken: string) => {
	try {
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
	} catch (err) {
		return null
	}
}

const getToken = async ({ type, code, url }: { type?: string | null; code?: string | null; url: string }) => {
	const { data: response } = await axios.post<Response<Tokens & { userInfo: User }>>(`/login/${type}`, {
		code,
		socialType: type,
		redirectUrl: url
	})
	return response
}

const logOut = async ({ email }: { email: string }) => {
	const res = await axios.post('/login/logout', {
		email
	})

	return res.status === 200
}

export { checkAccessToken, getToken, checkRefreshToken, logOut }
