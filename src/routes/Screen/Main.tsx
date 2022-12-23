import Modal from 'components/Modal'
import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/seperated_pie'
import MAIN from 'assets/main2.png'
import { motion, useAnimationControls, useTransform, Variants } from 'framer-motion'
import Pies from 'components/animation/Pies'
import { useRef } from 'react'
import useDraggablePosition from 'hooks/useDraggablePosition'

const Main = () => {
	const { atk } = store()
	const buttonAxios = useRef<HTMLDivElement | null>(null)
	const { startX, startY, endY, endX } = useDraggablePosition(buttonAxios)
	console.log(startX, startY, endX, endY)

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
				<Pies />
			</div>
			<motion.div ref={buttonAxios} className="fixed bottom-4 w-10 h-10 bg-teal-200 left-[50%] -translate-x-[50%] mx-auto" />
		</div>
	)
}

export default withNavigation(Main)
