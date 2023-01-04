import { motion, Variants } from 'framer-motion'
import store from 'store'
import useCopyClipboard from 'hooks/useCopyClipboard'
import Modal from './Modal'

const navItemVariants: Variants = {
	initial: {
		originX: 'right',
		transform: 'translateX(10%)',
		opacity: 0,
		transition: {
			duration: 0.1
		}
	},
	start: {
		originX: 'right',
		transform: 'translateX(0%)',
		opacity: 1
	},
	exit: {
		originX: 'right',
		transform: 'translateX(10%)',
		opacity: 0,
		transition: {
			duration: 0.1
		}
	}
}

type NavKey = 'history' | 'feve' | 'share'
const NavItem = () => {
	const { popup, refreshPopup, setPopup } = store((state) => ({
		popup: state.popup,
		setPopup: state.setPopup,
		refreshPopup: state.refreshPopup
	}))

	const onNavClick = (key: NavKey) => {
		setPopup({
			key,
			isOpen: true
		})
	}

	return (
		<>
			<motion.button
				className="w-10"
				variants={navItemVariants}
				onClick={() => {
					onNavClick('history')
				}}
			>
				<img className="stroke-white" src={`/image/nav/mypage.svg`} />
			</motion.button>
			<motion.button
				className="w-10"
				variants={navItemVariants}
				onClick={() => {
					onNavClick('feve')
				}}
			>
				<img className="stroke-white" src={`/image/nav/crown.svg`} />
			</motion.button>
			<motion.button
				className="w-10"
				variants={navItemVariants}
				onClick={() => {
					onNavClick('share')
				}}
			>
				<img className="stroke-white" src={`/image/nav/share.svg`} />
			</motion.button>
			{popup?.key === 'history' ? <Modal>이력창</Modal> : popup?.key === 'feve' ? <Modal>페브창</Modal> : null}
		</>
	)
}

export default NavItem
