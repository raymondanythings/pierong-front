import { ComponentType, useLayoutEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios, { getToken } from 'api'
import { useQuery } from 'react-query'
import store from 'store'
const withAuth = (Component: ComponentType<any>) => {
	const params = new URLSearchParams(window.location.search)
	const type = params.get('type')
	const code = params.get('code')
	if (!type || !code) {
		return Redirect
	}

	function WithAuthComponent() {
		const {
			data: token,
			isError,
			error
		} = useQuery(['user', 'login'], () => getToken({ type, code }), {
			cacheTime: Infinity,
			staleTime: Infinity
		})

		const { setTokens } = store()
		if (token) {
			setTokens(token)
			return <Navigate to="/main" />
		} else if (isError) {
			return <Navigate to="" />
		} else {
			return <Component code={code} type={type} />
		}
	}

	function Redirect() {
		return <Navigate to="login" />
	}

	return WithAuthComponent
}

export default withAuth
