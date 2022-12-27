import { motion, AnimatePresence, Variants, useAnimationControls } from 'framer-motion'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import Logo from 'assets/icons/logo.png'
interface ModalProps {
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
	const modalContainer = document.getElementById('modal')
	if (modalContainer) {
		return ReactDOM.createPortal(children, modalContainer)
	}
	return null
}

const CustomModal: React.FC<ModalProps> = ({ children }) => {
	console.log(children)
	const modalControl = useAnimationControls()
	return (
		<Modal>
			<AnimatePresence>
				{
					<motion.div
						variants={modalVariants}
						animate={modalControl}
						layoutId="modal"
						className="fixed top-0 left-0 w-full h-full flex justify-center items-center"
					>
						<div className="bg-gray-500 -z-10 w-full h-full absolute top-0 left-0 opacity-50"></div>
						<div className="w-4/5 min-h-[150px] rounded-2xl bg-mainTeal p-2 flex justify-center items-stretch border-black border border-solid relative">
							<div className="absolute w-12 h-12 bg-mainTeal -top-6 rounded-full border-black border border-solid p-1 flex items-stretch">
								<div className="bg-mainBeige border-black border border-solid flex justify-center items-center grow rounded-full">
									<img src={Logo} className="w-3/4" />
								</div>
							</div>
							<div className="grow rounded-2xl flex  flex-col justify-center items-center bg-mainBeige border-black border border-solid py-5">
								{/* <p>{errorMessage}</p> */}
								{children}
								<button
									// onClick={() => setErrorMessage('')}
									className="w-[100px] h-[30px] rounded-lg border border-solid border-black mt-2 text-white bg-mainTeal"
								>
									확인
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
