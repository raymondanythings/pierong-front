import { motion } from 'framer-motion'
import PIES from 'assets/seperated_pie'
const Pies = () => {
	return (
		<>
			{PIES.Pies.map((pie) => (
				<motion.div
					key={pie.src}
					onDrag={(event, info) => {
						console.log(info)
					}}
					drag
					dragSnapToOrigin
					className="absolute"
					style={{ maxWidth: pie.width + '%', top: pie.top + '%', left: pie.left + '%' }}
				>
					<img draggable={false} className="object-contain" src={pie.src} />
				</motion.div>
			))}
		</>
	)
}

export default Pies
