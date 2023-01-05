import { motion, Variants } from 'framer-motion'
import store from 'store'
import useCopyClipboard from 'hooks/useCopyClipboard'
import Modal from './Modal'
import History from './popup/History'
import MyPage from './popup/MyPage'
import { useNavigate } from 'react-router-dom'

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

type NavKey = 'history' | 'feve' | 'share' | 'mypage'
const NavItem = () => {
	const navigate = useNavigate()
	const { setPopup } = store((state) => ({
		setPopup: state.setPopup
	}))

	const onNavClick = (key: NavKey) => {
		if (key === 'feve') {
			navigate('/room/feve', { relative: 'route' })
		}
		setPopup({
			key,
			isOpen: true,
			btnHide: true
		})
	}

	return (
		<>
			<motion.button
				className="w-10"
				variants={navItemVariants}
				onClick={() => {
					onNavClick('mypage')
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
					onNavClick('history')
				}}
			>
				<img className="stroke-white" src={`/image/nav/pie.svg`} />
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
		</>
	)
}

export default NavItem
