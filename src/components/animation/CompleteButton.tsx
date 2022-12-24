import { AnimatePresence, HTMLMotionProps, motion, Variants } from 'framer-motion'
import { useState, HTMLAttributes, MutableRefObject, FC } from 'react'
import store from 'store'
type FramerDivElement = HTMLMotionProps<'div'> & HTMLAttributes<HTMLDivElement>

interface CompleteButtonProps extends FramerDivElement {
	refs: MutableRefObject<HTMLDivElement | null>
	isEnter: boolean
	onCompleteEnd?: (props?: any) => any | void
	onCompleteStart?: (props?: any) => any | void
}

const wrapperVariants: Variants = {
	beforeTrigger: ({ isEnter, isDragging }) => {
		let param: any = {
			width: '7rem',
			height: '3rem',
			scale: 1,
			backgroundColor: 'rgba(0,0,0,0)',
			transition: {
				duration: 0.25,
				type: 'spring',
				when: 'beforeChild',
				bounce: 0.1
			}
		}
		if (isEnter) {
			param.scale = 1.2
			if (!isDragging) {
				param = {
					width: '3rem',
					height: '3rem',
					backgroundColor: '#D9EEE1',
					scale: 0,
					transition: {
						backgroundColor: {
							duration: 0.25,
							type: 'keyframes',
							when: 'afterChild',
							bounce: 0.1
						},
						width: {
							duration: 0.25,
							type: 'keyframes',
							when: 'afterChild',
							bounce: 0.1
						},
						height: {
							duration: 0.25,
							type: 'keyframes',
							when: 'afterChild',
							bounce: 0.1
						},
						scale: {
							delay: 1.25,
							duration: 0.25
						}
					}
				}
			}
		}

		return param
	},
	exitTrigger: (props) => {
		const { isEnter = null } = props || {}

		if (isEnter) {
			return {
				width: '3rem',
				height: '3rem',
				backgroundColor: '#D9EEE1',
				scale: 0,
				transition: {
					backgroundColor: {
						duration: 0.25,
						type: 'keyframes',
						when: 'afterChild',
						bounce: 0.1
					},
					width: {
						duration: 0.25,
						type: 'keyframes',
						when: 'afterChild',
						bounce: 0.1
					},
					height: {
						duration: 0.25,
						type: 'keyframes',
						when: 'afterChild',
						bounce: 0.1
					},
					scale: {
						delay: 10,
						duration: 0.25
					}
				}
			}
		}

		return {
			scale: 0,
			transition: {
				duration: 0.25,
				when: 'afterChild'
			}
		}
	}
}

const CheckVariants: Variants = {
	beforeTrigger: (isExit: boolean) => ({
		opacity: 0,
		rotateZ: 0,
		scale: 0,
		transition: {}
	}),
	afterTrigger: (isExit: boolean) => ({
		opacity: 1,
		rotateZ: 0,
		scale: 1,
		transition: {}
	}),
	exitTrigger: (isExit: boolean) => {
		return {
			opacity: 0,
			rotateZ: 280,
			scale: 0,
			transition: {}
		}
	}
}

const CompleteButton: FC<CompleteButtonProps> = ({ onCompleteStart, onCompleteEnd, isEnter, ...rest }) => {
	const [isExit, setIsExit] = useState(false)
	const { isDragging } = store()

	return (
		<AnimatePresence>
			{((!isDragging && isEnter) || isDragging) && (
				<motion.div
					{...rest}
					animate="beforeTrigger"
					variants={wrapperVariants}
					onClick={(event) => {
						rest.onClick && rest.onClick(event)
					}}
					exit={'exitTrigger'}
					onAnimationStart={(e) => {
						if (!isDragging && isEnter) {
							onCompleteStart && onCompleteStart()
						}
					}}
					onAnimationComplete={() => {
						if (!isDragging && isEnter) {
							onCompleteEnd && onCompleteEnd()
						}
					}}
					layout
					custom={{
						isEnter,
						isDragging
					}}
				>
					{!isDragging && isEnter ? (
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
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default CompleteButton
