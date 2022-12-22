import Modal from 'components/Modal'
import withNavigation from 'layout/withNavigation'
import store from 'store'
import PIES from 'assets/pie'
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
			{/* <img className="absolute" src={MAIN} /> */}
			<motion.img className="absolute top-[] -left-[] w-3/5" src={PIES.CROWN} />
			{/* <div className="relative top-[27.5vh] -right-[21.3vw]"> */}
			<div onClick={() => console.log('dish')} className="max-w-[520px] absolute translate-x-[21%] translate-y-[63%]">
				<motion.img onClick={() => console.log('img1')} className="" src={PIES.Dish} />
				<div onClick={() => console.log('img2')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_1} />
				</div>
				<div onClick={() => console.log('img3')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_2} />
				</div>
				<div onClick={() => console.log('img4')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_3} />
				</div>
				<div onClick={() => console.log('img5')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_4} />
				</div>
				<div onClick={() => console.log('img6')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_5} />
				</div>
				<div onClick={() => console.log('img7')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_6} />
				</div>
				<div onClick={() => console.log('img8')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_7} />
				</div>
				<div onClick={() => console.log('img9')}>
					<motion.img className="absolute top-0 left-0" src={PIES.Pie_8} />
				</div>
			</div>
			{/* </div> */}
			{/* <Modal>????</Modal> */}
		</div>
	)
}

export default withNavigation(Main)
