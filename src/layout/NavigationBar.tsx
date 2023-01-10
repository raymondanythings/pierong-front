import Menus from 'components/Menus'
import Modal from 'components/Modal'
import NavItem from 'components/NavItem'
import History from 'components/popup/History'
import Login from 'components/popup/Login'
import MyPage from 'components/popup/MyPage'
import { AnimatePresence, motion, useAnimationControls, Variants } from 'framer-motion'
import { MutableRefObject, useRef, useState } from 'react'
import store from 'store'

interface NavigationBarProps {
	navigationRef: MutableRefObject<HTMLElement | null>
}

const navVariants: Variants = {
	start: {
		maxWidth: 480,
		transition: {
			when: 'afterChild',
			staggerChildren: 0.03
		}
	},
	exit: {
		maxWidth: 0,
		transition: {
			// when: 'afterChild',
			staggerChildren: 0.03
		}
	}
}

const NavigationBar = ({ navigationRef }: NavigationBarProps) => {
	const { isLogin, popup, toggleNav, setToggleNav } = store((state) => ({
		isLogin: state.isLogin,
		popup: state.popup,
		toggleNav: state.toggleNav,
		setToggleNav: state.setToggleNav
	}))
	const [open, setOpen] = useState(false)
	return (
		<>
			{/* <motion.nav
				ref={navBarRef}
				drag="y"
				dragConstraints={navigationRef}
				dragElastic={0.3}
				layout
				className="flex align-center absolute h-11 bg-[#57765E] right-0 overflow-hidden rounded-l-lg z-40 top-[35%]"
			>
				<motion.div
					animate={toggleControl}
					onClick={() => {
						if (open) {
							toggleControl.start('initial')
						} else {
							toggleControl.start('animate')
						}
						setOpen((prev) => !prev)
					}}
					className="flex items-center"
				>
					<motion.svg
						variants={toggleVariants}
						className="w-6 stroke-white"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
					</motion.svg>
					{open ? null : (
						<div className="pr-2">
							<svg
								width="25"
								height="25"
								viewBox="0 0 25 25"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<rect width="25" height="25" fill="url(#pattern0)" />
								<defs>
									<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
										<use xlinkHref="#image0_453_1550" transform="scale(0.0104167)" />
									</pattern>
									<image
										id="image0_453_1550"
										width="96"
										height="96"
										xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC/UlEQVR4nO2dy24TMRSGLRbcWgELJOBlKC9S4BVKBbwHF9GHKC2PwIaWZRdRiU9UTVXJnvqkpKAWtoPcwAZlQkky88+M/0/y2uPz2Weco+iMMYQQQgghhBBCCCGE/CenWXYn5PapetkOXvrq5Fy9FJ0YTs4v1uRlK3j7JK61MRsky7LrwcmL4O0pPFC+nhG8HYXcPheRa9Dgq+4/UCef0QFR2MmwuyFk94HBt4fwIHi4hMPaJcSjl/TO938Pu1NrOgpOXuIXLY0aQ2/X67vtTHvhOrupXlbyfG/JdIQ831uKa4q3oLJ1By9fR6OD25U/zO+rZtlOWDMdZ+jterkE+7jyB4j3/Mk7X96bRFBkDIIXW/IiemgSQcfpaFIa6lc/uZOziZOH3rJJhBB6yyUn4Kzyycvyn0kMRcWBAsZQABgKAEMBYCgADAWAaZ0A59xNdfZtcPYbunCm5aWEU3Xy5ujo6EZVcZibWScOTjbQAdbLinCyUVUc5maWiYuiuKLe/kQHVi897I/4zIuOw0KggBYKaFsKUmffVRWHuZl14vhiUy+vm/zvieDtSL286uRLuGsoBWChADAUAIYCwFAAGAoAQwFgKABM6wSwHA0W0KZaUGA5WsASWI4uKCDhFKQsRwsm97Mc3R5mzQTtnbhhUAAYCgBDAWAoAAwFgKEAMBQApnUCWI5eECnUggLL0QKWwHJ0QQEJpyBlOVowuZ/l6PYwayZo78QNgwLAUAAYCgBDAWAoIFkBbFlmTk7k1sTfEc5+BzbtkxWTCMN88AjXtK+8eemWSQT19kNJCWOz8slj/3x4+14gsW19eSljsFpX6+LRlJrKdjyiXWtdPLxIOyU7v87Wxf/aBQmPNVNv+3q724BFF80Y9lPR6101dRI/WqBOMvziBTucZMfHB/cMAuf6d4OzHxPe+TuwT5j8IR69ePuJLyF8QKSWMV5r/1ntaWca8QYQ++fHFu7By5eyX8ytHE7OgpP98doGq7XddgghhBBCCCGEEEKI6RK/AH7yZ0MpKfl1AAAAAElFTkSuQmCC"
									/>
								</defs>
							</svg>
						</div>
					)}
				</motion.div>

				<AnimatePresence mode="wait">
					{open && (
						<motion.div
							key="modal"
							className="flex justify-around mx-2"
							variants={navVariants}
							layout
							initial="initial"
							animate="start"
							exit="exit"
						>
							<NavItem />
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
			{popup?.key === 'history' ? (
				<Modal icon="message" top="large" isCustom>
					<History />
				</Modal>
			) : popup?.key === 'mypage' ? (
				<Modal icon="person">{isLogin ? <MyPage /> : <Login />}</Modal>
			) : null} */}
			<motion.nav
				layout
				className="border border-solid absolute top-4 right-4 h-10 aspect-square bg-[#57765E] overflow-hidden rounded-full z-40 p-0.5"
			>
				<div
					onClick={() => {
						setToggleNav(!toggleNav)
					}}
					className="flex justify-center items-center border border-solid border-white rounded-full grow h-full"
				>
					<svg
						width="25"
						height="25"
						viewBox="0 0 25 25"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						xmlnsXlink="http://www.w3.org/1999/xlink"
					>
						<rect width="25" height="25" fill="url(#pattern0)" />
						<defs>
							<pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
								<use xlinkHref="#image0_453_1550" transform="scale(0.0104167)" />
							</pattern>
							<image
								id="image0_453_1550"
								width="96"
								height="96"
								xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAAC/UlEQVR4nO2dy24TMRSGLRbcWgELJOBlKC9S4BVKBbwHF9GHKC2PwIaWZRdRiU9UTVXJnvqkpKAWtoPcwAZlQkky88+M/0/y2uPz2Weco+iMMYQQQgghhBBCCCGE/CenWXYn5PapetkOXvrq5Fy9FJ0YTs4v1uRlK3j7JK61MRsky7LrwcmL4O0pPFC+nhG8HYXcPheRa9Dgq+4/UCef0QFR2MmwuyFk94HBt4fwIHi4hMPaJcSjl/TO938Pu1NrOgpOXuIXLY0aQ2/X67vtTHvhOrupXlbyfG/JdIQ831uKa4q3oLJ1By9fR6OD25U/zO+rZtlOWDMdZ+jterkE+7jyB4j3/Mk7X96bRFBkDIIXW/IiemgSQcfpaFIa6lc/uZOziZOH3rJJhBB6yyUn4Kzyycvyn0kMRcWBAsZQABgKAEMBYCgADAWAaZ0A59xNdfZtcPYbunCm5aWEU3Xy5ujo6EZVcZibWScOTjbQAdbLinCyUVUc5maWiYuiuKLe/kQHVi897I/4zIuOw0KggBYKaFsKUmffVRWHuZl14vhiUy+vm/zvieDtSL286uRLuGsoBWChADAUAIYCwFAAGAoAQwFgKABM6wSwHA0W0KZaUGA5WsASWI4uKCDhFKQsRwsm97Mc3R5mzQTtnbhhUAAYCgBDAWAoAAwFgKEAMBQApnUCWI5eECnUggLL0QKWwHJ0QQEJpyBlOVowuZ/l6PYwayZo78QNgwLAUAAYCgBDAWAoIFkBbFlmTk7k1sTfEc5+BzbtkxWTCMN88AjXtK+8eemWSQT19kNJCWOz8slj/3x4+14gsW19eSljsFpX6+LRlJrKdjyiXWtdPLxIOyU7v87Wxf/aBQmPNVNv+3q724BFF80Y9lPR6101dRI/WqBOMvziBTucZMfHB/cMAuf6d4OzHxPe+TuwT5j8IR69ePuJLyF8QKSWMV5r/1ntaWca8QYQ++fHFu7By5eyX8ytHE7OgpP98doGq7XddgghhBBCCCGEEEKI6RK/AH7yZ0MpKfl1AAAAAElFTkSuQmCC"
							/>
						</defs>
					</svg>
				</div>
			</motion.nav>
			{popup?.key === 'history' ? (
				<Modal icon="message" top="large" isCustom>
					<History />
				</Modal>
			) : popup?.key === 'mypage' ? (
				<Modal icon="person">{isLogin ? <MyPage /> : <Login />}</Modal>
			) : null}
			<AnimatePresence mode="wait">{toggleNav ? <Menus /> : null}</AnimatePresence>
		</>
	)
}

export default NavigationBar
