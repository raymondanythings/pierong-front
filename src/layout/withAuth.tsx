import { ComponentType, useLayoutEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'api'
const withAuth = (Component: ComponentType<any>) => {
	const params = new URLSearchParams(window.location.search)
	const type = params.get('type')
	const code = params.get('code')

	function WithAuthComponent() {
		const [user, setUser] = useState<any>(null)
		const getUser = async () => {
			const res = await axios.post(`/login/${type}`, { code })
			setUser(res)
		}

		useLayoutEffect(() => {
			getUser()
		}, [])
		return <Component user={user} code={code} type={type} />
	}

	function Redirect() {
		return <Navigate to="login" />
	}

	if (!type || !code) {
		return Redirect
	}
	return WithAuthComponent
}

export default withAuth
