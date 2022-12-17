import axios from 'api'
import withAuth from 'layout/withAuth'
import { FC, useEffect } from 'react'

interface OAuthProps {
	type: 'google' | 'naver' | 'kakao'
	code: string
	user: any
}

const OAuth: FC<OAuthProps> = ({ user, code, type }) => {
	console.log(user)
	// const getUser = async () => {
	// 	const res = await axios.post(`/login/${type}`, { code })
	// 	console.log(res)
	// }

	// useEffect(() => {
	// 	getUser()
	// }, [])

	if (type === 'kakao') {
		return null
	}
	return null
}

export default withAuth(OAuth)
