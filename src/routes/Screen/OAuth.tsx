import axios from 'api'
import withAuth from 'layout/withAuth'
import { FC, useEffect } from 'react'

interface OAuthProps {
	type: 'google' | 'naver' | 'kakao'
	code: string
}

const OAuth: FC<OAuthProps> = ({ code, type }) => {
	console.log(code)
	const getUser = async () => {
		const res = await axios.post('/login', { type, code })
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
