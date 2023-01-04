import { LoginApi } from 'api'
import Loading from 'components/animation/Loading'
import { useTitle } from 'hooks/useTitle'
import { urlSafebtoa } from 'libs/utils'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate } from 'react-router-dom'
import store from 'store'
import { Tokens } from 'types'

interface OAuthProps {
	type: 'google' | 'naver' | 'kakao'
	code: string
	user: any
}

const OAuth = () => {
	const { search } = useLocation()
	const {} = useTitle('파이롱 | 로그인')
	const navigate = useNavigate()
	const { setTokens, setIsLogin, setPopup, setUser, refreshPopup } = store()
	const params = new URLSearchParams(search)
	const type = params.get('type')
	const code = params.get('code')
	const {
		data: { data: { atk, rtk, userInfo } = { rtk: null, atk: null, userInfo: null } } = {},
		isError,
		error
	} = useQuery(['user', 'login'], () => LoginApi.getToken({ type, code, url: sessionStorage.getItem('redirect_url') || '/' }), {
		retry: false,
		staleTime: Infinity
	})

	useEffect(() => {
		if (userInfo) {
			const token: Tokens = { atk, rtk }
			setUser(userInfo)
			setTokens(token)
			setIsLogin(true)
			const url = sessionStorage.getItem('redirect_url')
			sessionStorage.removeItem('redirect_url')
			navigate(url || `/room/${urlSafebtoa(userInfo.email)}`)
		} else if (isError) {
			setPopup({
				message: '로그인실패',
				isOpen: true,
				key: 'session',
				payload: {
					confirm: () => refreshPopup()
				}
			})
			navigate('/')
		}
	}, [userInfo, isError])
	return <Loading />
}

export default OAuth
