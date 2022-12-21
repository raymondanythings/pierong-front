import axios from 'api'
import withAuth from 'layout/withAuth'
import { FC, useEffect } from 'react'
import Loading from './Loading'

interface OAuthProps {
	type: 'google' | 'naver' | 'kakao'
	code: string
	user: any
}

const OAuth: FC<OAuthProps> = ({ user, code, type }) => {
	return <Loading />
}

export default withAuth(OAuth)
