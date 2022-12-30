import { LoginApi } from 'api'

const loginCheckLoader = async (data: any) => {
	const atk = localStorage.getItem('X-ACCESS-TOKEN')
	try {
		if (!atk) {
			return { expired: false }
		}
		return LoginApi.checkAccessToken(atk)
	} catch (err: any) {
		return { expired: false }
	}
}

export { loginCheckLoader }
