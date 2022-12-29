import NavigationBar from 'layout/NavigationBar'
import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLoaderData } from 'react-router-dom'
import store from 'store'
import { User } from 'types'

function App() {
	const loader = useLoaderData() as { userInfo?: User; atk?: string; expired?: boolean } | null
	const navigationRef = useRef(document.querySelector('main'))
	const { showNav, setTokens, setUser, setPopup } = store()

	if (loader?.expired) {
		// setPopup('message', {
		// 	confirm(data) {
		// 		console.log(data)
		// 	}
		// })
	}

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
			<div id="modal" className="fixed max-w-screen-default top-0 left-0 z-50"></div>
		</main>
	)
}
export default App
