import { LoginApi } from 'api'

const loginCheckLoader = async (data: any) => {
	const atk = localStorage.getItem('X-ACCESS-TOKEN')
	try {
		if (!atk) {
			return { expired: false }
		}
		const res = await LoginApi.checkAccessToken(atk)
		return res
	} catch (err: any) {
		return { expired: !!err?.expired }
	}
}

export { loginCheckLoader }
