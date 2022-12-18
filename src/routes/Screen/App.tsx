import NavigationBar from 'layout/NavigationBar'
import { useLayoutEffect, useRef } from 'react'
import { Outlet } from 'react-router-dom'
import store from 'store'

function App() {
	const navigationRef = useRef(document.querySelector('main'))
	const { showNav } = store()
	useLayoutEffect(() => {
		function setScreenSize() {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
		}
		setScreenSize()
		window.addEventListener('resize', setScreenSize)
		return () => window.removeEventListener('resize', setScreenSize)
	})
	return (
		<main className="max-w-screen-default mx-auto relative" ref={navigationRef}>
			{showNav && <NavigationBar navigationRef={navigationRef} />}
			<Outlet />
		</main>
	)
}
export default App
