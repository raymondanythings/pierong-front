import { FC, useCallback } from 'react'
import type { Pie } from 'types'
import { motion } from 'framer-motion'
import store from 'store'
import Lottie from 'react-lottie'
interface PiePieceProps {
	isMe: boolean
	dragged?: boolean
	pie: Pie
	startX: number
	startY: number
	endY: number
	endX: number
	onDragEnd?: (...rest: any) => void
}

const PiePiece: FC<PiePieceProps> = ({ isMe, dragged = true, startX, endX, startY, endY, pie, onDragEnd }) => {
	const { isLogin, dragState, setDragState, setClickedState, setPopup, refreshPopup } = store((state) => ({
		isLogin: state.isLogin,
		dragState: state.dragState,
		setDragState: state.setDragState,
		clickedState: state.clickedPieState,
		setClickedState: state.setClickedPieState,
		setPopup: state.setPopup,
		refreshPopup: state.refreshPopup
	}))

	const handleClickPie = useCallback(
		(pie: Pie) => {
			if (!isLogin) {
				setPopup({
					isOpen: true,
					key: 'login',
					payload: {
						cancel(data) {
							setDragState({
								state: 'idle',
								dragged: null,
								item: null
							})
							refreshPopup()
						},
						confirm() {
							setDragState({
								state: 'idle',
								dragged: null,
								item: null
							})
							refreshPopup()
						}
					}
				})
				return
			}
			setClickedState({
				state: 'clicked',
				item: pie
			})
			setPopup({
				isOpen: true,
				key: 'sendMessage',
				btnHide: true,
				payload: {
					cancel: () => {
						setClickedState({
							state: 'idle',
							item: null
						})
						refreshPopup()
					}
				}
			})
		},
		[dragged]
	)
	return dragged ? (
		<motion.div
			key={pie.src}
			layoutId={`pie-${pie.id}`}
			dragSnapToOrigin
			onDragStart={() => {
				setDragState({
					state: 'dragging',
					item: { ...pie },
					dragged: null
				})
			}}
			onDragEnd={(event, info) =>
				dragState.enter
					? onDragEnd && onDragEnd(event, info, pie)
					: setDragState({
							state: 'idle',
							dragged: null,
							item: null
					  })
			}
			onDrag={(event, info) => {
				const {
					point: { x, y }
				} = info
				if (x <= endX && x >= startX && y <= endY && y >= startY) {
					if (!dragState.enter) {
						setDragState({ enter: true })
					}
				} else {
					dragState.enter && setDragState({ enter: false })
				}
			}}
			drag
			className="absolute"
			style={{
				maxWidth: pie.width + '%',
				top: pie.top + '%',
				left: pie.left + '%',
				zIndex: dragState?.item?.id === pie.id ? 100 : pie.z ? pie.z : 4
			}}
		>
			<div className="absolute left-1/2 -translate-x-1/2 z-[1]">
				<Lottie
					isClickToPauseDisabled
					direction={3}
					options={{
						animationData: require('lottie/smog.json'),
						autoplay: true,
						loop: true,
						rendererSettings: {
							preserveAspectRatio: 'xMidYMid slice'
						}
					}}
				/>
			</div>
			<img draggable={false} className="object-contain" src={pie.src} />
		</motion.div>
	) : (
		<motion.div
			key={pie.src}
			layoutId={`pie-clicked-${pie.id}`}
			onClick={() => !isMe && handleClickPie(pie)}
			className="absolute"
			style={{
				maxWidth: pie.width + '%',
				top: pie.top + '%',
				left: pie.left + '%',
				zIndex: dragState?.item?.id === pie.id ? 100 : pie.z ? pie.z : 4
			}}
		>
			<div className="absolute left-1/2 -translate-x-1/2 z-[1]">
				<Lottie
					isClickToPauseDisabled
					direction={3}
					options={{
						animationData: require('lottie/smog.json'),
						autoplay: true,
						loop: true,
						rendererSettings: {
							preserveAspectRatio: 'xMidYMid slice'
						}
					}}
				/>
			</div>
			<img draggable={false} className="object-contain" src={pie.src} />
		</motion.div>
	)
}

export default PiePiece
