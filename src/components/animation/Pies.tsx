import { motion } from 'framer-motion'
import PIES from 'assets/seperated_pie'
import { Dispatch, SetStateAction } from 'react'

interface PiesProps {
	setToggle: Dispatch<SetStateAction<boolean>>
}

const Pies = ({ setToggle }: PiesProps) => {
	return (
		<>
			{PIES.Pies.map((pie) => (
				<motion.div
					key={pie.src}
					onDragStart={() => {
						setToggle(true)
					}}
					onDragEnd={() => {
						setToggle(false)
					}}
					drag
					dragSnapToOrigin
					className="absolute"
					style={{ maxWidth: pie.width + '%', top: pie.top + '%', left: pie.left + '%', zIndex: pie.z ?? 1 }}
				>
					<img draggable={false} className="object-contain" src={pie.src} />
				</motion.div>
			))}
		</>
	)
}

export default Pies
