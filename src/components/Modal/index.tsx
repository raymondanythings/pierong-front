import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
interface ModalProps {
	children: ReactNode
}

const Modal: React.FC<ModalProps> = ({ children }) => {
	const modalContainer = document.getElementById('modal')
	if (modalContainer) {
		return ReactDOM.createPortal(children, modalContainer)
	}
	return null
}

export default Modal
