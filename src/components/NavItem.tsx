import { FC } from 'react'
import { motion, Variants } from 'framer-motion'
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
		opacity: 1,
		transition: {
			// duration: 0.1
		}
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
	path: string
}

const NavItem: FC<NavItemProps> = ({ icon, title, path }) => {
	const navigate = useNavigate()
	const onMoveRoute = (route: string) => {
		navigate(route)
	}
	return (
		<motion.button className="will-change-auto w-10" variants={navItemVariants} onClick={() => onMoveRoute(path)}>
			<img src={`/image/nav/${icon}.svg`} />
		</motion.button>
	)
}

export default NavItem
