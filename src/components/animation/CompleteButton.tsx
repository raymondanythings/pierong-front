import { AnimatePresence, HTMLMotionProps, motion, Variants } from 'framer-motion'
import { useState, HTMLAttributes, MutableRefObject, FC, useRef } from 'react'
import store from 'store'
import { Pie } from 'types'
type FramerDivElement = HTMLMotionProps<'div'> & HTMLAttributes<HTMLDivElement>

interface CompleteButtonProps extends FramerDivElement {
	isEnter: boolean
	// isPandding: boolean
	onCompleteEnd?: (props?: any) => any | void
	onCompleteStart?: (props?: any) => any | void
}

const wrapperVariants: Variants = {
	beforeTrigger: ({ isEnter, isDragging }) => {
		let param: any = {
			width: '7rem',
			height: '3rem',
			scale: 1,
			backgroundColor: 'rgba(255,255,255,1)',
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
						// delay: 1,
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
	const { dragState, isLogin } = store()
	const pie = dragState.dragged as Pie | null
	const ref = useRef<HTMLDivElement | null>(null)
	const isDragged = dragState.state === 'dragging' || dragState.state === 'pending'
	return (
		<AnimatePresence>
			{isDragged ? (
				<motion.div
					{...rest}
					ref={ref}
					animate="beforeTrigger"
					variants={wrapperVariants}
					onClick={(event) => {
						rest.onClick && rest.onClick(event)
					}}
					exit={'exitTrigger'}
					onAnimationStart={(e) => {
						if (e === 'beforeTrigger' && !isDragged) {
							onCompleteStart && onCompleteStart()
						}
					}}
					onAnimationComplete={(e) => {
						if (e === 'beforeTrigger' && !isDragged) {
							onCompleteEnd && onCompleteEnd()
						}
					}}
					layout
					custom={{
						isEnter,
						isDragging: dragState.state
					}}
				>
					{!dragState.state ? (
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
							{isLogin ? '선택하기' : '로그인하기'}
						</motion.div>
					)}
					{isEnter && pie ? (
						<motion.div
							drag
							key={pie.src}
							layoutId={`pie-${pie.id}`}
							dragConstraints={ref}
							dragSnapToOrigin={!isEnter}
							className="absolute"
						>
							{/* <img draggable={false} className="object-contain" src={pie.src} /> */}
						</motion.div>
					) : null}
				</motion.div>
			) : null}
		</AnimatePresence>
	)
}

export default CompleteButton
