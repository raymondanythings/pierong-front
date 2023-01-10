import React from 'react'
import { Route } from 'react-router'

export default (
	<Route path="/">
		<Route path="oauth" />
		<Route path="room">
			<Route path="feve" />
			<Route path=":userId" />
		</Route>
		<Route path="privacy" />
		<Route path="*" />
	</Route>
)
