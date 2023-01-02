import { Dispatch, FC, SetStateAction } from 'react'
import { motion, Variants } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import store from 'store'
import { urlSafebtoa } from 'libs/utils'
import useCopyClipboard from 'hooks/useCopyClipboard'

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

interface NavItemProps {
	icon: string
	title: string
	path?: string
	setOpen: Dispatch<SetStateAction<boolean>>
}

const NavItem: FC<NavItemProps> = ({ icon, title, path, setOpen }) => {
	const navigate = useNavigate()
	const { isLogin, user, setPopup, refreshPopup } = store()
	const onMoveRoute = (route: string) => {
		navigate(route)
	}
	const { copyUrlOnClipboard } = useCopyClipboard({
		confirm: () => setOpen(false),
		cancel: () => setOpen(false)
	})
	return (
		<motion.button
			className="w-10"
			variants={navItemVariants}
			onClick={() => {
				if (path) {
					onMoveRoute(path)
				} else if (icon === 'share' && isLogin && user?.email) {
					copyUrlOnClipboard()
				}
			}}
		>
			<img className="stroke-white" src={`/image/nav/${icon}.svg`} />
		</motion.button>
	)
}

export default NavItem
