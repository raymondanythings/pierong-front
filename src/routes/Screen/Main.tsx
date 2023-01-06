import store from 'store'
import PIES from 'assets/seperated_pie'
import { AnimatePresence, motion, PanInfo, useAnimation, Variants } from 'framer-motion'
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
import SelectFeve from 'components/popup/SelectFeve'
import { useTitle } from 'hooks/useTitle'
import { useNavigate } from 'react-router-dom'
import CompletePie from 'components/popup/CompletePie'

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
	const navigate = useNavigate()
	const { data: pieData, refetch: pieRefetch } = useQuery(['room', 'pie', userId], () => PieApi.getUserPie({ userId }), {
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

	const { dragState, setDragState, popup, setPopup, user: loggedInUser, refreshPopup, isLogin } = store()
	const howToAnimate = useAnimation()

	const buttonAxios = useRef<HTMLDivElement | null>(null)

	const { startX, startY, endY, endX } = useDraggablePosition(buttonAxios)
	const isMe = loggedInUser && urlSafebtoa(loggedInUser.email) === userId
	const data = useMemo(() => ({ ...pieData, ...userResponse }), [pieData, userResponse])
	const selectedList = pieData?.userPiePiece?.map((item) => +item.pieceIndex)
	const pies: Pie[] | [] = PIES.Pies.filter((item) => {
		return item.id !== dragState?.dragged?.id && !selectedList?.includes(item.id)
	})

	const {} = useTitle(`파이롱${user.nickname ? ' | ' + user.nickname + '의 베이킹룸' : ''}`)
	const refetch = () => {
		pieRefetch()
		userRefetch()
	}

	const onSelectFeve = () => {
		setPopup({
			key: 'selectFeve',
			isOpen: true,
			btnHide: true
		})
	}

	const handleCreatePie = useCallback(
		async (feveId: string) => {
			const isCreateSuccess = await PieApi.createPie(feveId)
			if (isCreateSuccess) {
				refetch()
				setPopup({
					key: 'sharePopup',
					isOpen: true,
					btnHide: true
				})
			}
		},
		[userId]
	)

	useLayoutEffect(() => {
		if (isLogin && !loggedInUser?.nickname) {
			setPopup({
				isOpen: true,
				cancelDisabled: true,
				key: 'initialNickname',
				btnHide: true,
				payload: {}
			})
		}
	}, [userId])

	useLayoutEffect(() => {
		if (!pieData) {
			howToAnimate.start('animate')
		} else {
			howToAnimate.stop()
		}
		if (pieData?.bakingStatus === '02' && isMe) {
			setPopup({
				key: 'pie-done',
				isOpen: true,
				btnHide: true
			})
		}
	}, [pieData])

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
						item: null,
						enter: false
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
									item: null,
									enter: false
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
			{!isLogin || isMe ? null : (
				<button
					onClick={() => navigate(`/room/${urlSafebtoa(loggedInUser?.email || '')}`)}
					className="fixed top-4 left-4 z-10 bg-mainTeal w-28 border border-solid border-black rounded-full flex items-center justify-center"
				>
					<span className="m-1 text-white font-thin py-1 text-lg grow text-center rounded-full border border-solid border-white">
						내 방가기
					</span>
				</button>
			)}

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
						<motion.img
							initial={{
								filter: 'drop-shadow(0px 0px 0px rgba(255, 255, 255, 0.698))'
							}}
							animate={howToAnimate}
							variants={{
								animate: {
									filter: 'drop-shadow(1px 1px 15px rgba(255, 255, 255, 0.698))'
								}
							}}
							transition={{
								duration: 1.2,
								repeat: Infinity,
								ease: 'easeInOut',
								repeatType: 'reverse'
							}}
							src={PIES.HowTo}
						/>
						<motion.div className="absolute max-w-[15%] left-[61%]">
							<img src={PIES.Arrow} />
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
			<div className="h-full bg-mainBeige">
				<Crown rank={userResponse?.data.crownId} />

				<div className="relative max-w-[85%] translate-x-[40%] translate-y-[188%] z-30 disabled-drag">
					<div className="relative -left-[9%] z-[1]">
						<img className="drop-shadow-bottom" src={PIES.Plate} />
					</div>
					<div className="absolute top-[30%] -left-[5%]">
						<img src={PIES.GREEN_PAPER} />
						<img className="absolute -left-[57%] top-[41%] -z-[1]" draggable={false} src={PIES.WhitePaper} />
						<img className="absolute top-[13%] -left-[43%] max-w-[73.5%] z-10" draggable={false} src={PIES.Piece} />
					</div>
					<AnimatePresence>
						{data.userPieId
							? pies.map((pie) => (
									<PiePiece
										key={pie.id}
										pie={pie}
										startX={startX}
										startY={startY}
										endX={endX}
										endY={endY}
										onDragEnd={onDragEnd}
									/>
							  ))
							: null}
						{!pieData || pieData.bakingStatus === '03' || pieData.bakingStatus === '02' ? (
							<motion.div
								layoutId="pieSection"
								initial={{
									transformOrigin: 'right bottom',
									rotateZ: 180
								}}
								animate={{
									transformOrigin: 'right bottom',
									rotateZ: 0
								}}
								exit={{
									transformOrigin: 'right bottom',
									rotateZ: 180
								}}
								transition={{
									easings: ['circIn', 'circInOut'],
									duration: 1.3
								}}
								onClick={isMe ? onSelectFeve : () => {}}
								className="absolute -top-[65%] -left-[7%] max-w-[102%] z-10"
							>
								<img src="/image/dom.png" />
							</motion.div>
						) : null}
					</AnimatePresence>
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
						className={`fixed bottom-0 w-[180px] h-[60px] flex justify-center items-center p-2 z-30 border border-solid max-w-screen-default bg-mainTeal`}
						style={{
							right: 'var(--main-mr)'
						}}
					>
						<div className="border-[#EAE6DA] bg-mainTeal border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5">
							<div className="relative">
								{user.nickname}
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
					<SendMessage refetch={refetch} userPieId={pieData?.userPieId} ownerEmail={pieData?.ownerEmail} owner={user} />
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
			) : popup?.key === 'selectFeve' ? (
				<Modal icon="pancel">
					<SelectFeve onSelect={handleCreatePie} />
				</Modal>
			) : popup?.key === 'sharePopup' ? (
				<Modal>
					<div className="px-2 flex flex-col items-center justify-center relative h-full space-y-3">
						<p className="text-center leading-5">파이가 구워졌어요 친구들에게 공유해 파이조각마다 메세지를 받아보세요!</p>

						<button className="modal-btn mx-auto">공유하기</button>
					</div>
				</Modal>
			) : popup?.key === 'pie-done' ? (
				<Modal>
					<CompletePie />
				</Modal>
			) : null}
		</div>
	)
}

export default withNavigation(Main)
