import { FC } from 'react'
import { motion, Variants } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import store from 'store'

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
}

const NavItem: FC<NavItemProps> = ({ icon, title, path }) => {
	const navigate = useNavigate()
	const { isLogin, user } = store()
	const onMoveRoute = (route: string) => {
		navigate(route)
	}
	return (
		<motion.button
			className="w-10"
			variants={navItemVariants}
			onClick={() => {
				if (path) {
					onMoveRoute(path)
				} else if (icon === 'share' && isLogin) {
					window.navigator.clipboard.writeText(window.location.origin + '/room/' + user?.email).then((res) => console.log(res))
				}
			}}
		>
			<img className="stroke-white" src={`/image/nav/${icon}.svg`} />
		</motion.button>
	)
}

export default NavItem
