import NavigationBar from 'layout/NavigationBar'
import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import store from 'store'
import { User } from 'types'

function App() {
	const loader = useLoaderData() as { userInfo?: User; atk?: string } | null
	const navigationRef = useRef(document.querySelector('main'))
	const { showNav, setTokens, setUser } = store()

	useLayoutEffect(() => {
		function setScreenSize() {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}
		setScreenSize()
		window.addEventListener('resize', setScreenSize)
		if (loader) {
			const { atk, userInfo } = loader
			if (atk) {
				setTokens({ atk })
			}
			if (userInfo) {
				setUser(userInfo)
			}
		}
		return () => window.removeEventListener('resize', setScreenSize)
	}, [])
	return (
		<main className="max-w-screen-default overflow-y-hidden h-screen mx-auto relative" ref={navigationRef}>
			{showNav ? <NavigationBar navigationRef={navigationRef} /> : null}
			<Outlet />
			<div id="modal"></div>
		</main>
	)
}
export default App
