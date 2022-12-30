import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/seperated_pie'
import MAIN from 'assets/bg.png'
import CROWN from 'assets/crown'
import { AnimatePresence, motion, useAnimationControls, Variants } from 'framer-motion'
import { useCallback, useEffect, useRef, useState } from 'react'
import useDraggablePosition from 'hooks/useDraggablePosition'
import CompleteButton from 'components/animation/CompleteButton'
import Modal from 'components/Modal'
import { useQuery } from 'react-query'
import { PieApi, UserApi } from 'api'
import { PopupType } from 'types'
import { UserDetail } from 'types'
import NickNameChangePopup from 'components/Modal/NickNameChangePopup'

const crownVariants: Variants = {
	animate: {
		translateZ: [-100, 0, 100, 0],
		rotateZ: [-10, 0, 10, 0, -5, 0, 5, 0, -3, 0, 3, 0, -1, 0, 1, 0],
		transition: {
			duration: 0.3,
			type: 'spring',
			damping: 2
		}
	}
}
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
	const { dragState, setIsDragging, popup, setPopup, user: loggedInUser, refreshPopup } = store()
	const { data: PieData, refetch: pieRefetch } = useQuery(['room', 'pie', userId], () => PieApi.getUserCake({ userId }), {
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

	const [isEnter, setIsEnter] = useState(false)
	const [isPandding, setIsPandding] = useState(false)

	const [pieCapture, setPieCapture] = useState({
		x: 0,
		y: 0
	})

	const buttonAxios = useRef<HTMLDivElement | null>(null)
	const { startX, startY, endY, endX } = useDraggablePosition(buttonAxios)
	const crownControl = useAnimationControls()
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
	const isMe = loggedInUser?.email === userId
	const data = { ...PieData, ...userResponse }
	const pies = PIES.Pies.filter((item) => {
		return item.id !== dragState?.dragged?.id
	})
	return (
		<div className="h-full relative overflow-x-hidden ">
			<div className="aspect-[9/20] absolute ">
				<img src="/image/main_board.png" />
				{!popup?.isOpen ? (
					<motion.div
						layoutId="howTo"
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
				) : null}
			</div>
			<div className="h-full bg-mainBeige">
				<div className="max-w-[58%] -translate-x-[14%] translate-y-[100%] absolute z-50">
					<motion.div
						variants={crownVariants}
						animate={crownControl}
						onTouchStart={() => {
							crownControl.start('animate')
						}}
					>
						<img draggable={false} className="object-contain drop-shadow-bottom" src={CROWN.CROWN_1} />
					</motion.div>
				</div>

				<div className="relative max-w-[85%] translate-x-[40%] translate-y-[188%] z-30 disabled-drag">
					<div className="relative -left-[9%] z-[1]">
						<img className="drop-shadow-bottom" src={PIES.Plate} />
					</div>
					<div className="absolute top-[30%] -left-[5%]">
						<img src={PIES.GREEN_PAPER} />
						<img className="absolute -left-[57%] top-[41%] -z-[1]" draggable={false} src={PIES.WhitePaper} />
						<img className="absolute top-[13%] -left-[43%] max-w-[73.5%] z-10" draggable={false} src={PIES.Piece} />
					</div>
					{data ? (
						pies.map((pie) => (
							<motion.div
								key={pie.src}
								layoutId={`pie-${pie.id}`}
								dragSnapToOrigin
								onDragStart={() => {
									setIsDragging({
										state: true,
										dragged: null
									})
								}}
								onDragEnd={(event, info) => {
									if (isEnter) {
										setPopup({
											isOpen: true,
											key: 'sendMessage',
											btnHide: true
										})
										setIsDragging({
											state: false,
											dragged: { ...pie }
										})
									} else {
										setIsDragging({
											state: false,
											dragged: null
										})
									}
								}}
								onDrag={(event, info) => {
									const {
										point: { x, y }
									} = info
									if (x <= endX && x >= startX && y <= endY && y >= startY) {
										if (!isEnter) {
											setIsEnter(true)
										}
									} else {
										isEnter && setIsEnter(false)
									}
								}}
								drag={!isPandding}
								className="absolute"
								style={{
									maxWidth: pie.width + '%',
									top: pieCapture.x || pie.top + '%',
									left: pieCapture.y || pie.left + '%',
									zIndex: dragState?.dragged?.id === pie.id ? 55 : pie.z ? pie.z : 4
								}}
							>
								<img draggable={false} className="object-contain" src={pie.src} />
							</motion.div>
						))
					) : (
						<motion.div
							layoutId="pieSection"
							onClick={handleCreatePie}
							className="absolute z-30 top-[12%] left-[8%] max-w-[70%]"
						>
							<img src="/image/baking/letter.png" />
						</motion.div>
					)}
				</div>

				<div className="max-w-[59%] top-[65.5%]" draggable={false}></div>

				<div className="">
					<CompleteButton
						isPandding={isPandding}
						isEnter={isEnter}
						onCompleteStart={() => {
							setIsPandding(true)
						}}
						onCompleteEnd={() => {
							setIsPandding(false)
							setIsEnter(false)
						}}
						className="fixed z-50 w-0 h-0 left-0 right-0 bottom-4 mx-auto origin-center rounded-full flex items-center justify-center border border-solid"
					/>
				</div>

				<div ref={buttonAxios} className="fixed left-0 right-0 mx-auto bottom-4 w-[7rem] h-[3rem] invisible"></div>
			</div>

			{popup?.key === 'howTo' ? (
				<Modal>
					<div className="p-5 flex flex-col space-y-6">
						<img src="/image/howTo/1.png" />
						<img src="/image/howTo/2.png" />
						<img src="/image/howTo/3.png" />
					</div>
				</Modal>
			) : null}
			{popup?.key === 'sendMessage' ? (
				<Modal>
					<div className="p-5 flex flex-col space-y-6">
						<span>MESSAGE ? </span>
						<button
							onClick={() => {
								setIsDragging({
									state: false,
									dragged: null
								})
								setIsEnter(false)
								refreshPopup()
							}}
						>
							confirm
						</button>
					</div>
				</Modal>
			) : null}
			<AnimatePresence>
				{!dragState.state ? (
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
										src="/image/pancel.png"
									/>
								) : null}
								{popup?.key === 'changeNickName' ? (
									<Modal>
										<NickNameChangePopup refetch={refetch} />
									</Modal>
								) : null}
							</div>
						</div>
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}

export default Main
