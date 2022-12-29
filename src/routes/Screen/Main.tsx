import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/seperated_pie'
import MAIN from 'assets/bg.png'
import CROWN from 'assets/crown'
import { AnimatePresence, motion, useAnimationControls, Variants } from 'framer-motion'
import { useCallback, useRef, useState } from 'react'
import useDraggablePosition from 'hooks/useDraggablePosition'
import CompleteButton from 'components/animation/CompleteButton'
import { useLocation } from 'react-router-dom'
import Modal from 'components/Modal'
import { useQuery } from 'react-query'
import { PieApi } from 'api'

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

const Main = ({ userId }: { userId: string }) => {
	const { data, isLoading, refetch } = useQuery(['room', 'pie', userId], () => PieApi.getUserCake({ userId }), {
		cacheTime: Infinity,
		retry: false,
		refetchOnWindowFocus: false,
		enabled: !!userId,
		refetchOnMount: false
	})

	const [isEnter, setIsEnter] = useState(false)
	const [isPandding, setIsPandding] = useState(false)
	const [toggle, setToggle] = useState(false)
	const { dragState, setIsDragging } = store()
	const buttonAxios = useRef<HTMLDivElement | null>(null)
	const { startX, startY, endY, endX } = useDraggablePosition(buttonAxios)
	const crownControl = useAnimationControls()
	const howToControl = useAnimationControls()

	const handleCreatePie = useCallback(async () => {
		const isCreateSuccess = await PieApi.createPie()
		console.log(isCreateSuccess)
		if (isCreateSuccess) {
			refetch()
		}
	}, [userId])

	return (
		<div className="h-full relative overflow-x-hidden ">
			<div className="aspect-[9/20] absolute ">
				<img src="/image/main_board.png" />
				{!toggle ? (
					<motion.div
						layoutId="howTo"
						animate={howToControl}
						className="absolute top-[4.5%] max-w-[60%] left-[35%]"
						variants={{
							animate: {
								left: '50%',
								top: '50%',
								translate: '-50% -50%',
								zIndex: 101
							}
						}}
						onAnimationComplete={(def) => {
							setToggle(true)
						}}
						onClick={() => {
							howToControl.start('animate')
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
						PIES.Pies.map((pie, index) => (
							<motion.div
								key={pie.src}
								onDragStart={() => {
									setIsDragging({
										state: true,
										dragged: {
											...pie,
											index
										}
									})
								}}
								onDragEnd={() => {
									setIsDragging({
										state: false,
										dragged: null
									})
								}}
								onDrag={(event, info) => {
									const {
										point: { x, y }
									} = info
									if (x <= endX && x >= startX && y <= endY && y >= startY) {
										!isEnter && setIsEnter(true)
									} else {
										isEnter && setIsEnter(false)
									}
								}}
								drag={!isPandding}
								dragSnapToOrigin
								className="absolute"
								style={{
									maxWidth: pie.width + '%',
									top: pie.top + '%',
									left: pie.left + '%',
									zIndex: dragState?.dragged?.index === index ? 55 : pie.z ? pie.z : 4
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
			<AnimatePresence>
				{toggle ? (
					<motion.div
						onClick={() => setToggle(false)}
						className="absolute max-w-full left-0 top-0 h-full w-full z-[101]"
						layoutId="howTo"
					>
						????
					</motion.div>
				) : null}
			</AnimatePresence>
		</div>
	)
}

export default Main
