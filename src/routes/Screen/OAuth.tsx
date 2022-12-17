import axios from 'api'
import withAuth from 'layout/withAuth'
import { FC, useEffect } from 'react'

interface OAuthProps {
	type: 'google' | 'naver' | 'kakao'
	code: string
}

const OAuth: FC<OAuthProps> = ({ code, type }) => {
	const getUser = async () => {
		const res = await axios.post(`/login/${type}`, { code })
		console.log(res)
	}

	useEffect(() => {
		getUser()
	}, [])

	if (type === 'kakao') {
		return null
	}
	return null
}

export default withAuth(OAuth)
