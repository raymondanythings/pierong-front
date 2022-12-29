import { motion, AnimatePresence, Variants, useAnimationControls, HTMLMotionProps } from 'framer-motion'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import Logo from 'assets/icons/logo.png'
import store from 'store'
interface ModalProps extends HTMLMotionProps<'div'> {
	children?: ReactNode
}

const modalVariants: Variants = {
	initial: {
		// bottom: '-10%'
	},
	visible: {
		// bottom: '10%'
	}
}

const Modal: React.FC<ModalProps> = ({ children }) => {
	const popup = store((state) => state.popup)
	const modalContainer = document.getElementById('modal')
	if (modalContainer && popup?.isOpen) {
		return ReactDOM.createPortal(children, modalContainer)
	}
	return null
}

const CustomModal: React.FC<ModalProps> = ({ children, ...rest }) => {
	const modalControl = useAnimationControls()
	const popup = store((state) => state.popup)
	return (
		<Modal>
			<AnimatePresence>
				{
					<motion.div
						variants={modalVariants}
						animate={modalControl}
						className="fixed top-0 py-10 h-full flex justify-center items-center w-screen max-w-screen-default left-[50%] -translate-x-[50%]"
						{...rest}
					>
						<div
							className="bg-gray-500 -z-10 w-full h-full absolute top-0 left-0 opacity-50"
							onClick={popup?.payload?.cancel}
						></div>
						<div className="w-4/5 min-h-[150px] rounded-2xl bg-mainTeal p-2 flex justify-center items-stretch border-black border border-solid relative">
							<div className="absolute w-12 h-12 bg-mainTeal -top-6 rounded-full border-black border border-solid p-1 flex items-stretch">
								<div className="bg-mainBeige border-black border border-solid flex justify-center items-center grow rounded-full">
									<img src={Logo} className="w-3/4" />
								</div>
							</div>
							<div className="grow rounded-2xl flex  flex-col items-center bg-mainBeige border-black border border-solid py-5 overflow-y-scroll max-h-[calc(var(--vh,1vh)_*_80)]">
								{children ? children : <p>{popup?.message}</p>}
								<button
									onClick={popup?.payload?.confirm}
									className="min-w-[100px] rounded-full border border-solid border-black mt-2 text-white bg-mainTeal py-3"
								>
									{popup?.btnText ?? '확인'}
								</button>
							</div>
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</Modal>
	)
}

export default CustomModal
