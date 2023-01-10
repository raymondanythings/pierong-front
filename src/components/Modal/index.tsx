import { motion, AnimatePresence, Variants, useAnimationControls, HTMLMotionProps } from 'framer-motion'
import React, { ReactNode } from 'react'
import ReactDOM from 'react-dom'
import store from 'store'
interface ModalProps extends HTMLMotionProps<'div'> {
	children?: ReactNode
	icon?: 'logo' | 'info' | 'message' | 'pancel' | 'book' | 'person'
	top?: 'default' | 'large'
	isCustom?: boolean
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

const CustomModal: React.FC<ModalProps> = ({ children, icon = 'logo', isCustom = false, top = 'default', ...rest }) => {
	const modalControl = useAnimationControls()
	const { popup, refreshPopup } = store((state) => ({ popup: state.popup, refreshPopup: state.refreshPopup }))
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
						<div
							className={`w-4/5 min-h-[150px] rounded-2xl bg-mainTeal p-2 flex justify-center items-stretch border-black border border-solid relative ${
								top === 'default' ? '' : 'pt-10'
							}`}
						>
							<div className="top-icon z-[1]">
								<div className="bg-mainBeige border-black border border-solid flex justify-center items-center grow rounded-full">
									<img src={`/image/icon/${icon}.png`} className="w-3/4 max-w-[23px] max-h-[23px]" />
								</div>
							</div>
							{isCustom ? (
								children
							) : (
								<div
									className={`grow flex relative  flex-col items-center bg-mainBeige border-black border border-solid py-5 pt-10 overflow-y-scroll max-h-[calc(var(--vh,1vh)_*_80)] ${
										top === 'default' ? 'rounded-2xl' : 'rounded-b-2xl'
									}`}
									style={{ justifyContent: !children ? 'flex-end' : '' }}
								>
									<div className="absolute top-[10px] right-[10px]" onClick={refreshPopup}>
										<svg
											// onClick={onClosePopup}
											width="25"
											height="25"
											viewBox="0 0 25 25"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
											xmlnsXlink="http://www.w3.org/1999/xlink"
										>
											<rect width="25" height="25" fill="url(#xbutton)" />
											<defs>
												<pattern id="xbutton" patternContentUnits="objectBoundingBox" width="1" height="1">
													<use xlinkHref="#image0_711_1510" transform="scale(0.0104167)" />
												</pattern>
												<image
													id="image0_711_1510"
													width="96"
													height="96"
													xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACZUlEQVR4nO2dzWoUQRhFKy4cRR+sX+B2bVKVJ+iFSNW29yIk4FLQd3AhPpQgGINLpWYc8C9mJj3W99P3wCwD9547aZKZojsEQgghhBBCCCGEEEIIUc7Zj5cMeIbHsabXsaSbWPLHseYXwzRtgnOGadrEml/Gmj6NJX2NJb05f37+pHuQrfyav/38Gkt673mEYZo2rePvvdsIXYPM8/xgrPnLH0EcjzDcJn83wE1z0jVQrOnzX8M4HGH4l/ztAPm6e6hY8uWtgRyNMNwlfzfApcpg1kcYtHfEjIex5Hd3vDs+XMwXj4IxYKWbmaCeO5kL7LGL2eCeOlguAMPZzReBwcxuCsFQVnfFYCCj24JQnM19USjMtJrCUJSlKxqKQ0EGUSQFYO3yJUWA8uWEgPLlxIDy5QSB8uVEgfLl3q2g/PuBE4ij/IVgwQiUfyJwjxEo/8TgiBEoX/hMzqj53I51cMhvwto/21E7QqF8uREK5cuNUCj/vwAOIAd4CTIkv/JSJC+/coTFDPxHTA7wowgb8sOCnyEnkr+HIywE/EJGDvArSR/y9/BydCDgsRQ5eDBLEB5NFISHcwXh8XRBNPxlAgUZRNBUHIqydEFjYSjMtLqiUJxtNQVhIKP7YjCU1W0hGMzsrggMZ/dRIBjuYDa4hy7mAnvqZCaox27qb2rqveNY0iuVwSRGqOkq9KTdKXz73ADn8o+8efdZ39vXt4cXrED+ISM0F91vXz/W/HYt8tU9wKGBGU/bCLvHeOTrdgt3z/J/GaGmq9Z5/wiT5iIIIvcgmzU/xIcQQgghhBBCCCGEEBKO4jvQGH7JWfI8XwAAAABJRU5ErkJggg=="
												/>
											</defs>
										</svg>
									</div>
									{children ? children : <p>{popup?.message}</p>}
									{popup && !popup.btnHide ? (
										<button
											onClick={popup?.payload?.confirm}
											className="min-w-[100px] rounded-full border border-solid border-black mt-2 text-white bg-mainTeal py-3"
										>
											{popup?.btnText ?? '확인'}
										</button>
									) : null}
								</div>
							)}
						</div>
					</motion.div>
				}
			</AnimatePresence>
		</Modal>
	)
}

export default CustomModal
