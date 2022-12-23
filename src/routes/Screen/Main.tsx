import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/seperated_pie'
import MAIN from 'assets/main2.png'
import { AnimatePresence, motion } from 'framer-motion'
import { useRef, useState } from 'react'
import useDraggablePosition from 'hooks/useDraggablePosition'
import CompleteButton from 'components/animation/CompleteButton'

const Main = () => {
	const [dragAction, setDragAction] = useState(false)
	const [isEnter, setIsEnter] = useState(false)
	const [trigger, setTrigger] = useState(false)
	const { atk } = store()
	const buttonAxios = useRef<HTMLDivElement | null>(null)
	const { startX, startY, endY, endX } = useDraggablePosition(buttonAxios)

	return (
		<div className="h-full relative overflow-x-hidden">
			<motion.img src={MAIN} className="aspect-[9/20] absolute" />
			<div className="max-w-[58%] -translate-x-[9%] translate-y-[100%] z-20">
				<motion.div drag dragSnapToOrigin>
					<motion.img
						className="object-contain"
						src={PIES.CROWN}
						style={{
							filter: 'drop-shadow(1vw 0.5vh black)'
						}}
					/>
				</motion.div>
			</div>
			<div className="max-w-[85%] translate-x-[40%] translate-y-[42%] z-30">
				<div>
					<motion.img className="" src={PIES.Dish} />
				</div>
				{PIES.Pies.map((pie) => (
					<motion.div
						key={pie.src}
						onDragStart={() => {
							setDragAction(true)
						}}
						onDragEnd={() => {
							setDragAction(false)
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
						drag
						dragSnapToOrigin
						className="absolute"
						style={{ maxWidth: pie.width + '%', top: pie.top + '%', left: pie.left + '%' }}
					>
						<img draggable={false} className="object-contain" src={pie.src} />
					</motion.div>
				))}
			</div>
			<div ref={buttonAxios} className="fixed left-0 right-0 mx-auto bottom-4 w-[7rem] h-[3rem] invisible" />

			<AnimatePresence>
				{(dragAction || isEnter) && (
					<CompleteButton
						trigger={trigger}
						setTrigger={setTrigger}
						refs={buttonAxios}
						isEnter={isEnter}
						className="fixed w-0 h-0 left-0 right-0 bottom-4 mx-auto origin-center rounded-full flex items-center justify-center border-mainTeal border border-solid"
					/>
				)}
			</AnimatePresence>
		</div>
	)
}

export default withNavigation(Main)
