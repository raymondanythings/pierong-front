import Modal from 'components/Modal'
import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/seperated_pie'
import MAIN from 'assets/main2.png'
import { motion, useAnimationControls, Variants } from 'framer-motion'
const pieceVariants: Variants = {
	out: {
		x: '-100%',
		y: '100vh',
		transition: {
			type: 'spring',

			damping: 10
		}
	}
}
const Main = () => {
	const { atk } = store()

	const pieceOutControl = useAnimationControls()
	console.log(atk)
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
				<motion.div drag dragSnapToOrigin className="absolute max-w-[34%] top-[4%] left-[38.7%]">
					<motion.img className="object-contain" src={PIES.Pie_1} />
				</motion.div>
				<motion.div drag dragSnapToOrigin className="absolute max-w-[33%] top-[5%] left-[7%] ">
					<motion.img className="object-contain" src={PIES.Pie_2} />
				</motion.div>
				<motion.div drag dragSnapToOrigin className="absolute max-w-[55%] top-[15.7%] -left-[15%]">
					<motion.img className="object-contain" src={PIES.Pie_3} />
				</motion.div>
				<motion.div drag dragSnapToOrigin className="absolute max-w-[55%] top-[11%] left-[39%]">
					<motion.img className="object-contain" src={PIES.Pie_4} />
				</motion.div>
				<motion.div drag dragSnapToOrigin className="absolute max-w-[55%] top-[39%] left-[39%]">
					<motion.img className="object-contain" src={PIES.Pie_5} />
				</motion.div>
				<motion.div drag dragSnapToOrigin className="absolute max-w-[36%] top-[43.5%] left-[38.3%]">
					<motion.img className="object-contain" src={PIES.Pie_6} />
				</motion.div>
				<motion.div drag dragSnapToOrigin className="absolute max-w-[55%] top-[43%] -left-[15%]">
					<motion.img className="object-contain" src={PIES.Pie_7} />
				</motion.div>
				<motion.div drag dragSnapToOrigin className="absolute max-w-[37%] top-[43%] left-[6%]">
					<motion.img className="object-contain" src={PIES.Pie_8} />
				</motion.div>
			</div>
			{/* 
			
			
			
			*/}
		</div>
	)
}

export default withNavigation(Main)
