import axios from 'api'
import withAuth from 'layout/withAuth'
import { FC, useEffect } from 'react'

interface OAuthProps {
	type: 'google' | 'naver' | 'kakao'
	token: string
}

const OAuth: FC<OAuthProps> = ({ token, type }) => {
	const getUser = async () => {
		const res = await axios.post('/login', { type, token })
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
