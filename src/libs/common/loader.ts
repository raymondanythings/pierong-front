import { defer } from 'react-router-dom'
import { LoginApi } from 'api'
import axios from 'axios'

const loginCheckLoader = async () => {
	const atk = localStorage.getItem('X-ACCESS-TOKEN')
	try {
		if (!atk) {
			return null
		}
		const { userInfo, atk: atkResponse } = await LoginApi.checkAccessToken(atk || '')
		if (atkResponse) {
			axios.defaults.headers['X-ACCESS-TOKEN'] = atkResponse
		}
		return defer({ userInfo, atk: atkResponse })
	} catch (err: any) {
		if (err) {
			console.log(err, '???')
			// 무조건 재로그인  ㄱ
		}
		return null
	}
}

export { loginCheckLoader }
