import NavigationBar from 'layout/NavigationBar'
import { useLayoutEffect, useRef } from 'react'
import Logo from 'assets/icons/logo.png'
import { Outlet, useLoaderData } from 'react-router-dom'
import store from 'store'
import { AnimatePresence, motion, useAnimationControls, Variants } from 'framer-motion'
import { User } from 'types'

const modalVariants: Variants = {
	initial: {
		// bottom: '-10%'
	},
	visible: {
		// bottom: '10%'
	}
}

function App() {
	const loader = useLoaderData() as { userInfo?: User; atk?: string } | null
	const navigationRef = useRef(document.querySelector('main'))
	const { showNav, errorMessage, setErrorMessage, setTokens, setUser } = store()
	const modalControl = useAnimationControls()
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
			{showNav && <NavigationBar navigationRef={navigationRef} />}
			<Outlet />
			<AnimatePresence>
				{errorMessage && (
					<motion.div
						variants={modalVariants}
						animate={modalControl}
						id="modal"
						className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
					>
						<div className="bg-gray-500 -z-10 w-full h-full absolute top-0 left-0 opacity-50"></div>
						<div className="w-4/5 min-h-[150px] rounded-2xl bg-mainTeal p-2 flex justify-center items-stretch border-black border border-solid relative">
							<div className="absolute w-12 h-12 bg-mainTeal -top-6 rounded-full border-black border border-solid p-1 flex items-stretch">
								<div className="bg-mainBeige border-black border border-solid flex justify-center items-center grow rounded-full">
									<img src={Logo} className="w-3/4" />
								</div>
							</div>
							<div className="grow rounded-2xl flex  flex-col justify-center items-center bg-mainBeige border-black border border-solid py-5">
								<p>{errorMessage}</p>
								<button
									onClick={() => setErrorMessage('')}
									className="w-[100px] h-[30px] rounded-lg border border-solid border-black mt-2 text-white bg-mainTeal"
								>
									확인
								</button>
							</div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	)
}
export default App
