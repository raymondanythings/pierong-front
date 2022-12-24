import { ComponentType, useLayoutEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import axios, { getToken } from 'api'
import { useQuery } from 'react-query'
import store from 'store'
import { Tokens } from 'types'
const withAuth = (Component: ComponentType<any>) => {
	const params = new URLSearchParams(window.location.search)
	const type = params.get('type')
	const code = params.get('code')
	if (!type || !code) {
		return Redirect
	}

	function WithAuthComponent() {
		const {
			data: { data: { atk = undefined, rtk = undefined, ...user } = {} } = {},
			isError,
			error
		} = useQuery(['user', 'login'], () => getToken({ type, code }), {
			cacheTime: Infinity,
			staleTime: Infinity
		})
		const { setTokens, setErrorMessage, setUser } = store()
		const token: Tokens = { atk, rtk }
		if (user) {
			setUser(user)
		}
		if (token) {
			setTokens(token)
			return <Navigate to="/main" />
		} else if (isError) {
			setErrorMessage('로그인실패')
			return <Navigate to="/" />
		} else {
			return <Component code={code} type={type} />
		}
	}

	function Redirect() {
		return <Navigate to="/login" />
	}

	return WithAuthComponent
}

export default withAuth
