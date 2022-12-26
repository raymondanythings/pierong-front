import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/seperated_pie'
import MAIN from 'assets/bg.png'
import CROWN from 'assets/crown'
import { motion } from 'framer-motion'
import { useRef, useState } from 'react'
import useDraggablePosition from 'hooks/useDraggablePosition'
import CompleteButton from 'components/animation/CompleteButton'

const Main = () => {
	const [isEnter, setIsEnter] = useState(false)
	const [isPandding, setIsPandding] = useState(false)
	const { atk, setIsDragging } = store()
	const buttonAxios = useRef<HTMLDivElement | null>(null)
	const { startX, startY, endY, endX } = useDraggablePosition(buttonAxios)

	return (
		<div className="h-full relative overflow-x-hidden ">
			<div className="aspect-[9/20] absolute ">
				<img src={MAIN} />
			</div>
			<div className="h-full bg-mainBeige">
				<div className="max-w-[58%] -translate-x-[9%] top-[20%] absolute z-50">
					<motion.div drag dragSnapToOrigin>
						<img draggable={false} className="object-contain drop-shadow-bottom" src={CROWN.CROWN_1} />
					</motion.div>
				</div>
				<div className="relative max-w-[85%] translate-x-[40%] translate-y-[188%] z-30 disabled-drag">
					<div className="absolute -left-[54%] max-w-full -top-[76%] -z-[1]">
						<img src={PIES.Books} />
					</div>
					<div className="relative -left-[9%] z-[1]">
						<img className="drop-shadow-bottom" src={PIES.Plate} />
					</div>
					<div className="absolute top-[30%] -left-[5%]">
						<img src={PIES.GREEN_PAPER} />
						<img className="absolute -left-[57%] top-[41%] -z-[1]" draggable={false} src={PIES.WhitePaper} />
						<img className="absolute top-[13%] -left-[43%] max-w-[73.5%] z-10" draggable={false} src={PIES.Piece} />
					</div>
					{PIES.Pies.map((pie, index) => (
						<motion.div
							key={pie.src}
							onDragStart={() => {
								setIsDragging(true)
							}}
							onDragEnd={() => {
								setIsDragging(false)
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
							style={{ maxWidth: pie.width + '%', top: pie.top + '%', left: pie.left + '%', zIndex: pie.z ?? 4 }}
						>
							<img draggable={false} className="object-contain" src={pie.src} />
						</motion.div>
					))}
				</div>

				<div className="max-w-[59%] top-[65.5%]" draggable={false}></div>

				<div ref={buttonAxios} className="fixed left-0 right-0 mx-auto bottom-4 w-[7rem] h-[3rem] invisible" />
				<CompleteButton
					refs={buttonAxios}
					isEnter={isEnter}
					onCompleteStart={() => {
						setIsPandding(true)
						console.log('START???????????')
					}}
					onCompleteEnd={() => {
						setIsPandding(false)
						console.log('END???????????')
					}}
					className="fixed w-0 h-0 left-0 right-0 bottom-4 mx-auto origin-center rounded-full flex items-center justify-center border-mainTeal border border-solid"
				/>
			</div>
		</div>
	)
}

export default withNavigation(Main)
