import * as LoginApi from './login'
import * as PieApi from './pie'
import * as UserApi from './user'
import api from 'axios'

export const axios = api.create({ baseURL: process.env.REACT_APP_API_PATH })
axios.interceptors.response.use(
	(response) => {
		return response
	},
	async (rejected) => {
		if (rejected.response?.status === 401 && rejected.response?.data.code !== '1005') {
			const refreshToken = localStorage.getItem('X-REFRESH-TOKEN')
			if (refreshToken) {
				const atk = await LoginApi.checkRefreshToken(refreshToken)
				if (atk) {
					rejected.config.headers['X-ACCESS-TOKEN'] = atk
					const res = await axios.request(rejected.config)

					res.data.data.atk = atk
					return res
				}
			}
		}

		return Promise.reject(rejected)
	}
)

export { LoginApi, PieApi, UserApi }
