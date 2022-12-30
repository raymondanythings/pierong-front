import CustomModal from 'components/Modal'
import NavigationBar from 'layout/NavigationBar'
import { useLayoutEffect, useRef } from 'react'
import { Outlet, useLoaderData, useNavigate, useNavigation } from 'react-router-dom'
import store from 'store'
import { User } from 'types'
import axios from 'axios'

function App() {
	const loader = useLoaderData() as { userInfo?: User; atk?: string; expired?: boolean } | null
	const navigationRef = useRef(document.querySelector('main'))
	const { showNav, setTokens, setUser, setPopup, popup, refreshPopup } = store()
	const navigate = useNavigate()
	useLayoutEffect(() => {
		function setScreenSize() {
			let vh = window.innerHeight * 0.01
			document.documentElement.style.setProperty('--vh', `${vh}px`)
			const main = document.querySelector('main')
			if (main) {
				document.documentElement.style.setProperty('--main-mr', `${main.offsetLeft}px`)
			}
		}
		setScreenSize()
		window.addEventListener('resize', setScreenSize)
		if (loader) {
			const { atk, userInfo } = loader
			const rtk = localStorage.getItem('X-REFRESH-TOKEN')
			if (atk && rtk) {
				axios.defaults.headers['X-ACCESS-TOKEN'] = atk
				setTokens({ atk, rtk })
			} else {
				const aToken = localStorage.getItem('X-ACCESS-TOKEN')
				if (aToken && rtk) {
					axios.defaults.headers['X-ACCESS-TOKEN'] = aToken
					setTokens({ atk: aToken, rtk: rtk })
				}
			}
			if (userInfo) {
				setUser(userInfo)
			}
		}
		return () => window.removeEventListener('resize', setScreenSize)
	}, [])
	useLayoutEffect(() => {
		if (loader?.expired) {
			setPopup({
				message: '세션이 만료되었습니다.',
				key: 'session',
				isOpen: true,
				payload: {
					confirm: () => {
						refreshPopup()
					},
					cancel: () => {
						refreshPopup()
					}
				}
			})
		}
	}, [loader?.expired])
	return (
		<main className="max-w-screen-default overflow-y-hidden h-screen mx-auto relative" ref={navigationRef}>
			{showNav ? <NavigationBar navigationRef={navigationRef} /> : null}
			<Outlet />
			<div id="modal" className="fixed max-w-screen-default top-0 left-0 z-50"></div>
			{popup?.key === 'session' ? <CustomModal></CustomModal> : null}
		</main>
	)
}
export default App
