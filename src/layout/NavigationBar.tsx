import { AnimatePresence, motion, useAnimationControls, Variants } from 'framer-motion'
import { MutableRefObject, useRef, useState } from 'react'

import NavItem from 'components/NavItem'
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

const toggleVariants: Variants = {
	initial: { rotateZ: 0 },
	animate: {
		rotateZ: 180
	}
}

const NavigationBar = ({ navigationRef }: NavigationBarProps) => {
	const toggleControl = useAnimationControls()
	const navBarRef = useRef<HTMLElement | null>(null)
	const [open, setOpen] = useState(false)
	const navItems = [
		{
			icon: 'crown',
			title: 'home',
			path: '/'
		},
		{
			icon: 'alert',
			title: 'alert',
			path: '/'
		},
		{
			icon: 'message',
			title: 'message',
			path: '/'
		},
		{
			icon: 'person',
			title: 'person',
			path: '/'
		},
		{
			icon: 'share',
			title: 'share'
		}
	]
	return (
		<>
			<motion.nav
				ref={navBarRef}
				drag="y"
				dragConstraints={navigationRef}
				dragElastic={0.3}
				layout
				className="flex align-center absolute h-11 bg-[#57765E] right-0 overflow-hidden rounded-l-lg z-40 top-[35%]"
			>
				<motion.svg
					variants={toggleVariants}
					animate={toggleControl}
					onClick={() => {
						if (open) {
							toggleControl.start('initial')
						} else {
							toggleControl.start('animate')
						}
						setOpen((prev) => !prev)
					}}
					className="w-6 stroke-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
				</motion.svg>

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
							{navItems.map((item, index) => (
								<NavItem setOpen={setOpen} key={item.title + index} {...item} />
							))}
						</motion.div>
					)}
				</AnimatePresence>
			</motion.nav>
		</>
	)
}

export default NavigationBar
