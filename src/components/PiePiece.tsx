import { FC } from 'react'
import type { Pie } from 'types'
import { motion } from 'framer-motion'
import store from 'store'
import Lottie from 'react-lottie'
interface PiePieceProps {
	pie: Pie
	startX: number
	startY: number
	endY: number
	endX: number
	onDragEnd?: (...rest: any) => void
}

const PiePiece: FC<PiePieceProps> = ({ startX, endX, startY, endY, pie, onDragEnd }) => {
	const { dragState, setDragState } = store((state) => ({
		dragState: state.dragState,
		setDragState: state.setDragState
	}))
	return (
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
	)
}

export default PiePiece
