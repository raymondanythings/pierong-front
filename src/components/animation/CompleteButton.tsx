import { AnimatePresence, HTMLMotionProps, motion, useAnimationControls, Variants } from 'framer-motion'
import { useEffect, useState, HTMLAttributes, MutableRefObject, FC, Dispatch, SetStateAction } from 'react'
import useDraggablePosition from 'hooks/useDraggablePosition'
type FramerDivElement = HTMLMotionProps<'div'> & HTMLAttributes<HTMLDivElement>

interface CompleteButtonProps extends FramerDivElement {
	refs: MutableRefObject<HTMLDivElement | null>
	isEnter: boolean
	trigger: boolean
	setTrigger: Dispatch<SetStateAction<boolean>>
}

const wrapperVariants: Variants = {
	beforeTrigger: (isEnter: boolean) => {
		const param = {
			width: '7rem',
			height: '3rem',
			scale: 1,
			backgroundColor: 'rgba(0,0,0,0)',
			transition: {
				type: 'spring',
				when: 'beforeChild',
				bounce: 0.1
			}
		}
		if (isEnter) {
			param.scale = 1.2
		}
		return param
	},
	afterTrigger: {
		width: '3rem',
		height: '3rem',
		backgroundColor: '#D9EEE1',
		transition: {
			type: 'spring',
			when: 'beforeChild',
			bounce: 0.1
		}
	},
	exitTrigger: {
		scale: 0,
		transition: {
			duration: 0.25,
			when: 'afterChild'
		}
	}
}

const CheckVariants: Variants = {
	beforeTrigger: (isExit: boolean) => ({
		opacity: 0,
		rotateZ: 0,
		scale: 0,
		transition: {
			// duration: 0.25
			// delay: isExit ? 0 : 0.25
		}
	}),
	afterTrigger: (isExit: boolean) => ({
		opacity: 1,
		rotateZ: 0,
		scale: 1,
		transition: {
			// duration: 0.25
			// delay: isExit ? 0 : 0.25
		}
	}),
	exitTrigger: (isExit: boolean) => {
		return {
			opacity: 0,
			rotateZ: 280,
			scale: 0,
			transition: {
				// duration: isExit ? 0.01 : 0.25
				// delay: isExit ? 0 : 0.25
			}
		}
	}
}

const CompleteButton: FC<CompleteButtonProps> = ({ trigger, setTrigger, isEnter, ...rest }) => {
	const wrapperControl = useAnimationControls()
	const [isExit, setIsExit] = useState(false)
	// const { startX, startY, endY, endX } = useDraggablePosition(rest.refs || null)
	useEffect(() => {
		if (trigger) {
			wrapperControl.start('afterTrigger')
		} else {
			wrapperControl.start('beforeTrigger')
		}
	}, [trigger, isEnter])

	console.log(trigger)
	return (
		<motion.div
			animate={wrapperControl}
			{...rest}
			variants={wrapperVariants}
			onAnimationStart={(def) => {
				setIsExit((prev) => def === 'exitTrigger')
			}}
			onClick={(event) => {
				setTrigger((prev) => !prev)
				rest.onClick && rest.onClick(event)
			}}
			custom={isEnter}
			exit="exitTrigger"
			layout
		>
			<AnimatePresence mode="wait">
				{trigger ? (
					<motion.svg
						key="test1"
						className="w-8 h-8 opacity-0"
						fill="none"
						initial="beforeTrigger"
						animate="afterTrigger"
						exit="exitTrigger"
						variants={CheckVariants}
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						custom={isExit}
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
					</motion.svg>
				) : (
					<motion.div
						key="test2"
						custom={isExit}
						initial="beforeTrigger"
						animate="afterTrigger"
						exit="exitTrigger"
						variants={CheckVariants}
					>
						선택하기
					</motion.div>
				)}
			</AnimatePresence>
		</motion.div>
	)
}

export default CompleteButton
