import { FC, useCallback } from 'react'
import type { Pie } from 'types'
import { motion } from 'framer-motion'
import store from 'store'
import Lottie from 'react-lottie'
import { PieApi } from 'api'
import { urlSafebtoa } from 'libs/utils'
import { useQuery } from 'react-query'
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
	const { isLogin, user, owner, dragState, setDragState, setClickedState, setPopup, refreshPopup } = store((state) => ({
		isLogin: state.isLogin,
		user: state.user,
		dragState: state.dragState,
		owner: state.owner,
		setDragState: state.setDragState,
		clickedState: state.clickedPieState,
		setClickedState: state.setClickedPieState,
		setPopup: state.setPopup,
		refreshPopup: state.refreshPopup
	}))
	const { data: pieData, refetch: pieRefetch } = useQuery(
		['room', 'pie', urlSafebtoa(owner?.email ?? '')],
		() => PieApi.getUserPie({ userId: urlSafebtoa(owner?.email ?? '') }),
		{
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!owner?.email
		}
	)

	const handleClickPie = useCallback(
		async (pie: Pie) => {
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
			} else if (isMe) {
				setPopup({
					isOpen: true,
					key: 'myPie',
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
				return
			} else {
				const param = {
					ownerEmail: pieData?.ownerEmail,
					userPieId: pieData?.userPieId
				}
				const check = await PieApi.checkAlreadySend(param)
				if (check) {
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
				} else {
					setPopup({
						isOpen: true,
						key: 'alreadySelect',
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
				}
			}
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
			onClick={() => handleClickPie(pie)}
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
