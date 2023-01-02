import store from 'store'
import PIES from 'assets/seperated_pie'
import { AnimatePresence, motion, PanInfo, Variants } from 'framer-motion'
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react'
import useDraggablePosition from 'hooks/useDraggablePosition'
import CompleteButton from 'components/animation/CompleteButton'
import Modal from 'components/Modal'
import { useQuery } from 'react-query'
import { PieApi, UserApi } from 'api'
import { Pie } from 'types'
import { UserDetail } from 'types'
import NickNameChangePopup from 'components/Modal/NickNameChangePopup'
import SendMessage from 'components/popup/SendMessage'
import Login from 'components/popup/Login'
import Crown from 'components/Crown'
import { urlSafebtoa } from 'libs/utils'
import withNavigation from 'layout/withNavigation'
import PiePiece from 'components/PiePiece'

const signTitleVariants: Variants = {
	initial: {
		y: 100
	},
	animate: {
		y: 0
	},
	exit: {
		y: 100
	}
}

const Main = ({ userId, user }: { userId: string; user: UserDetail }) => {
	const { dragState, setDragState, popup, setPopup, user: loggedInUser, refreshPopup, isLogin } = store()
	const { data: pieData, refetch: pieRefetch } = useQuery(['room', 'pie', userId], () => PieApi.getUserCake({ userId }), {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
		retry: false,
		refetchOnWindowFocus: false,
		enabled: !!userId
	})
	const { data: userResponse, refetch: userRefetch } = useQuery(['room', 'user', userId], () => UserApi.getUserDetail(userId), {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
		retry: false,
		refetchOnWindowFocus: false,
		enabled: !!userId
	})
	const buttonAxios = useRef<HTMLDivElement | null>(null)
	const { startX, startY, endY, endX } = useDraggablePosition(buttonAxios)
	const isMe = loggedInUser && urlSafebtoa(loggedInUser.email) === userId
	const data = useMemo(() => ({ ...pieData, ...userResponse }), [pieData, userResponse])
	const selectedList = pieData?.userCakePiece?.map((item) => +item.pieceIndex)
	const pies: Pie[] | [] = PIES.Pies.filter((item) => {
		return item.id !== dragState?.dragged?.id && !selectedList?.includes(item.id)
	})

	const refetch = () => {
		pieRefetch()
		userRefetch()
	}
	const handleCreatePie = useCallback(async () => {
		const isCreateSuccess = await PieApi.createPie()
		if (isCreateSuccess) {
			refetch()
		}
	}, [userId])

	useLayoutEffect(() => {
		if (isLogin && !user.nickname) {
			setPopup({
				isOpen: true,
				cancelDisabled: true,
				key: 'initialNickname',
				btnHide: true,
				payload: {}
			})
		}
	}, [userId])

	const onDragEnd = useCallback(
		(event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, pie: Pie) => {
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
						}
					}
				})
				return
			} else {
				if (isMe) {
					setPopup({
						isOpen: true,
						key: 'alert',
						message: '직접 만든 파이는 선택할 수 없어요.'
					})
					setDragState({
						state: 'idle',
						dragged: null,
						item: null
					})
				} else {
					setPopup({
						isOpen: true,
						key: 'sendMessage',
						btnHide: true,
						payload: {
							cancel: () => {
								setDragState({
									state: 'idle',
									dragged: null,
									item: null
								})
								refreshPopup()
							}
						}
					})
					setDragState({
						state: 'pending',
						dragged: { ...pie },
						item: { ...pie }
					})
				}
			}
		},
		[userId]
	)

	return (
		<div className="h-full relative overflow-x-hidden">
			<div className="aspect-[9/20] absolute ">
				<img src="/image/main_board.png" />
				<motion.div
					className="absolute top-[4.5%] max-w-[60%] left-[35%]"
					onClick={() => {
						setPopup({
							isOpen: true,
							key: 'howTo'
						})
					}}
				>
					<motion.div className="relative">
						<img src={PIES.HowTo} />
						<motion.div className="absolute max-w-[15%] left-[61%]">
							<img src={PIES.Arrow} />
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
			<div className="h-full bg-mainBeige">
				<Crown />

				<div className="relative max-w-[85%] translate-x-[40%] translate-y-[188%] z-30 disabled-drag">
					<div className="relative -left-[9%] z-[1]">
						<img className="drop-shadow-bottom" src={PIES.Plate} />
					</div>
					<div className="absolute top-[30%] -left-[5%]">
						<img src={PIES.GREEN_PAPER} />
						<img className="absolute -left-[57%] top-[41%] -z-[1]" draggable={false} src={PIES.WhitePaper} />
						<img className="absolute top-[13%] -left-[43%] max-w-[73.5%] z-10" draggable={false} src={PIES.Piece} />
					</div>
					{data.userCakeId ? (
						pies.map((pie) => (
							<PiePiece pie={pie} startX={startX} startY={startY} endX={endX} endY={endY} onDragEnd={onDragEnd} />
						))
					) : (
						<motion.div
							layoutId="pieSection"
							onClick={isMe ? handleCreatePie : () => {}}
							className="absolute z-30 top-[12%] left-[8%] max-w-[70%]"
						>
							<img src="/image/baking/letter.png" />
						</motion.div>
					)}
				</div>

				<div className="max-w-[59%] top-[65.5%]" draggable={false}></div>

				<div className="">
					<CompleteButton className="fixed z-50 w-0 h-0 left-0 right-0 bottom-4 mx-auto origin-center rounded-full flex items-center justify-center border border-solid" />
				</div>

				<div ref={buttonAxios} className="fixed left-0 right-0 mx-auto bottom-4 w-[7rem] h-[3rem] invisible"></div>
			</div>

			<AnimatePresence>
				{dragState.state === 'idle' ? (
					<motion.div
						variants={signTitleVariants}
						exit="exit"
						animate="animate"
						initial="initial"
						className="fixed bottom-0 w-[180px] h-[60px] flex justify-center items-center bg-mainTeal p-2 z-30 border border-solid max-w-screen-default"
						style={{
							right: 'var(--main-mr)'
						}}
					>
						<div className="border-[#EAE6DA] border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5">
							<div className="relative">
								{user.nickname || '123'}
								<small
									className="ml-1"
									style={{
										fontSize: '0.75em'
									}}
								>
									의 베이킹룸
								</small>
								{isMe ? (
									<img
										onClick={() => {
											setPopup({
												message: '닉네임변경',
												key: 'changeNickName',
												isOpen: true,
												btnHide: true
											})
										}}
										className="w-3 h-3 ml-1 absolute top-1/2  -translate-y-1/2 left-full"
										src="/image/icon/pancel.png"
									/>
								) : null}
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
			{popup?.key === 'howTo' ? (
				<Modal icon="book">
					<div className="p-5 flex flex-col space-y-6">
						<img src="/image/howTo/1.png" />
						<img src="/image/howTo/2.png" />
						<img src="/image/howTo/3.png" />
					</div>
				</Modal>
			) : popup?.key === 'sendMessage' ? (
				<Modal icon="message">
					<SendMessage refetch={refetch} userCakeId={pieData?.userCakeId} ownerEmail={pieData?.ownerEmail} />
				</Modal>
			) : popup?.key === 'alert' ? (
				<Modal />
			) : popup?.key === 'changeNickName' ? (
				<Modal icon="pancel">
					<NickNameChangePopup refetch={refetch} />
				</Modal>
			) : popup?.key === 'login' ? (
				<Modal>
					<Login />
				</Modal>
			) : popup?.key === 'initialNickname' ? (
				<Modal icon="pancel">
					<NickNameChangePopup refetch={refetch} title="닉네임을 설정해 주세요." />
				</Modal>
			) : null}
		</div>
	)
}

export default withNavigation(Main)
