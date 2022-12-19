import { oauthService } from 'types'

type IOAuth = {
	[key in oauthService]: {
		baseUrl: string
		params: {
			client_id: string
			response_type: string
			redirect_uri: string
			state?: string
			scope?: string
		}
	}
}

const OAUTH_URLS: IOAuth = {
	kakao: {
		baseUrl: process.env.REACT_APP_KAKAO_AUTH_URL,
		params: {
			client_id: process.env.REACT_APP_KAKAO_CLIENT_ID,
			response_type: process.env.REACT_APP_RESPONSE_TYPE,
			redirect_uri: process.env.REACT_APP_KAKAO_REDIRECT_URI
		}
	},
	naver: {
		baseUrl: process.env.REACT_APP_NAVER_AUTH_URL,
		params: {
			client_id: process.env.REACT_APP_NAVER_CLIENT_ID,
			response_type: process.env.REACT_APP_RESPONSE_TYPE,
			redirect_uri: process.env.REACT_APP_NAVER_REDIRECT_URI,
			state: process.env.REACT_APP_NAVER_STATE
		}
	},
	google: {
		baseUrl: process.env.REACT_APP_GOOGLE_AUTH_URL,
		params: {
			client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
			response_type: process.env.REACT_APP_RESPONSE_TYPE,
			redirect_uri: process.env.REACT_APP_GOOGLE_REDIRECT_URI,
			scope: process.env.REACT_APP_GOOGLE_SCOPE
		}
	}
}

const useAuth = () => {
	const authLogin = (type: oauthService) => {
		const urlSearchParam = new URLSearchParams()
		urlSearchParam.append('client_id', OAUTH_URLS[type].params.client_id)
		urlSearchParam.append('response_type', OAUTH_URLS[type].params.response_type)
		urlSearchParam.append('redirect_uri', OAUTH_URLS[type].params.redirect_uri)
		if (type === 'naver') {
			urlSearchParam.append('state', OAUTH_URLS[type].params.state!)
		} else if (type === 'google') {
			urlSearchParam.append('scope', OAUTH_URLS[type].params.scope!)
		}
		window.location.assign(`${OAUTH_URLS[type].baseUrl}?${urlSearchParam.toString()}`)
	}

	return { authLogin }
}

export default useAuth
