import React from 'react'
import { Navigate, NavigateProps } from 'react-router-dom'

const Redirect = (props: NavigateProps) => {
	return <Navigate {...props} />
}

export default Redirect
