import { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'

const withAuth = (Component: ComponentType<any>) => {
	const params = new URLSearchParams(window.location.search)
	const type = params.get('type')
	const code = params.get('code')

	function WithAuthComponent() {
		return <Component code={code} type={type} />
	}

	function Redirect() {
		return <Navigate to="login" />
	}

	if (!type || code) {
		return Redirect
	}
	return WithAuthComponent
}

export default withAuth
