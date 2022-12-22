import Modal from 'components/Modal'
import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/seperated_pie'
import MAIN from 'assets/main.png'
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
		<div className="h-full relative bg-[url('assets/main.png')] bg-cover bg-no-repeat bg-center ">
			<motion.img className="absolute top-[] -left-[] w-3/5" src={PIES.CROWN} />
			<div className="relative translate-x-[21%] translate-y-[63%]">
				<motion.img className="" src={PIES.Dish} />
				<motion.img className=" absolute object-contain top-0 left-[40vw] " src={PIES.Pie_1} />
				<motion.img className=" absolute object-contain  top-[1vh] left-[17.4vw]" src={PIES.Pie_2} />
				<motion.img className=" absolute object-contain top-[9.4vh] -left-[1vw]" src={PIES.Pie_3} />
				<motion.img className=" absolute object-contain  top-[6.5vh] left-[41vw]" src={PIES.Pie_4} />
				<motion.img className=" absolute object-contain  top-[33vh] left-[41vw]" src={PIES.Pie_5} />
				<motion.img className=" absolute object-contain  top-[37.5vh] left-[40.5vw]" src={PIES.Pie_6} />
				<motion.img className=" absolute object-contain  top-[37.5vh] -left-[0.7vw]" src={PIES.Pie_7} />
				<motion.img className=" absolute object-contain  top-[37vh] left-[16vw]" src={PIES.Pie_8} />
			</div>
		</div>
	)
}

export default withNavigation(Main)
