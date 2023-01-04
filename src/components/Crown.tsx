import { useAnimationControls, Variants } from 'framer-motion'
import { motion } from 'framer-motion'
import CROWN from 'assets/crown'
import { CrownRank } from 'types'
interface CrownProps {
	rank?: CrownRank
}

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

const Crown = ({ rank = '1' }: CrownProps) => {
	const crownControl = useAnimationControls()
	return (
		<div className={'max-w-[58%] -translate-x-[14%] absolute z-[1] ' + (+rank >= 4 ? 'translate-y-[77%]' : 'translate-y-[100%]')}>
			<motion.div
				variants={crownVariants}
				animate={crownControl}
				onTouchStart={() => {
					crownControl.start('animate')
				}}
			>
				<img draggable={false} className="object-contain drop-shadow-bottom" src={CROWN[`CROWN_${rank ?? 1}`]} />
			</motion.div>
		</div>
	)
}

export default Crown
