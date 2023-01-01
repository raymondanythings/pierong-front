import { FC, HTMLAttributes, memo } from 'react'
import { motion, Variants } from 'framer-motion'

interface LoadingCustom {
	deg: number
	positive: boolean
	duration: number
}

function getCustomValues(): LoadingCustom {
	const deg = Math.random() * 360
	const positive = !!Math.round(Math.random())
	const duration = Math.random() * 3 + 3
	const custom = { deg, positive, duration }
	return custom
}

const rotateVaiants: Variants = {
	initial: (custom: LoadingCustom) => ({
		rotateZ: custom.positive ? custom.deg : -custom.deg
	}),
	animate: (custom: LoadingCustom) => ({
		rotateZ: custom.positive ? custom.deg + 360 : -custom.deg - 360,
		transition: {
			repeat: Infinity,
			ease: 'linear',
			repeatType: 'loop',
			duration: custom.duration
		}
	})
}

const Crown: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => {
	const classNames = rest.className ? ' ' + rest.className : ''
	const custom = getCustomValues()
	return (
		<div className={`max-w-[35%]` + classNames}>
			<motion.img custom={custom} initial="initial" variants={rotateVaiants} animate="animate" src="/image/loading/crown.png" />
		</div>
	)
}

const PieCut: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => {
	const classNames = rest.className ? ' ' + rest.className : ''
	const custom = getCustomValues()
	return (
		<div className={`max-w-[35%] relative` + classNames}>
			<motion.img
				custom={custom}
				initial="initial"
				variants={rotateVaiants}
				animate="animate"
				src="/image/loading/loading-cutted-pie.png"
			/>
			<div
				className="absolute -z-[1] w-[80%] top-[12%] left-[12%] h-auto aspect-square bg-mainTeal border border-solid"
				style={{
					transform: `rotateZ(${custom.deg}deg)`
				}}
			/>
		</div>
	)
}
const PieWhole: FC<HTMLAttributes<HTMLDivElement>> = ({ ...rest }) => {
	const classNames = rest.className ? ' ' + rest.className : ''
	const custom = getCustomValues()
	return (
		<div className={`max-w-[35%] relative ` + classNames}>
			<motion.img
				custom={custom}
				initial="initial"
				variants={rotateVaiants}
				animate="animate"
				src="/image/loading/loading-whole-pie.png"
			/>
			<div
				style={{
					transform: `rotateZ(${custom.deg}deg)`
				}}
				className="absolute -z-[1] w-[80%] top-[12%] left-[12%] h-auto aspect-square bg-mainTeal border border-solid"
			/>
		</div>
	)
}

const Loading = () => {
	return (
		<div className="w-full h-full overflow-hidden flex flex-col items-center">
			<div
				className="relative w-[150%] h-[100%] overflow-hidden flex flex-col -space-y-4 bg-cover loading-container -z-[2]"
				style={{
					backgroundImage: "url('/image/loading/loading_background.png')"
				}}
			>
				<div>
					<PieCut />
				</div>
				<div>
					<PieCut />
					<Crown />
				</div>
				<div>
					<PieCut />
				</div>
				<div>
					<PieCut />
					<Crown />
				</div>
				<div>
					<PieCut />
				</div>
				<div>
					<PieCut />
					<Crown />
				</div>
			</div>
		</div>
	)
}

export default memo(Loading)
