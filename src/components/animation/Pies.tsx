import { motion } from 'framer-motion'
import PIES from 'assets/seperated_pie'
import { Dispatch, SetStateAction } from 'react'

interface PiesProps {
	toggle: boolean
	setToggle: Dispatch<SetStateAction<boolean>>
}

const Pies = ({ toggle, setToggle }: PiesProps) => {
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
					onDrag={(event, info) => {
						const {
							point: { x, y }
						} = info
						console.log(x, y)
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
