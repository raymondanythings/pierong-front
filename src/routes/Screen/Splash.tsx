import { useLayoutEffect, useState } from 'react'
import Logo from 'assets/icons/logo.png'
import { motion, useAnimationControls, Variants } from 'framer-motion'
import AnimatedText from 'components/animation/AnimatedText'
import useAuth from 'hooks/useAuth'

import Google from 'assets/icons/google.png'
import Kakao from 'assets/icons/kakao.png'
import Naver from 'assets/icons/naver.png'

const container: Variants = {
	hidden: {
		opacity: 0
	},
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.1
			// when: 'afterChild'
		}
	}
}

const imgVariants: Variants = {
	hidden: {
		opacity: 0,
		scale: 0,
		rotateZ: 320
	},
	visible: {
		scale: 1,
		opacity: 1,
		rotateZ: 360
	}
}
const Splash = () => {
	const textControls = useAnimationControls()
	const titleControls = useAnimationControls()
	const buttonControls = useAnimationControls()
	const imgControls = useAnimationControls()
	const { authLogin } = useAuth()
	useLayoutEffect(() => {
		titleControls.start('visible')
	}, [])
	return (
		<div className="relative flex h-full  items-end justify-center pb-14">
			<div
				className="absolute w-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-[11px] items-center"
				style={{ top: 'calc(var(--vh, 1vh) * 45)' }}
			>
				<motion.div
					initial="hidden"
					animate={titleControls}
					variants={container}
					onAnimationComplete={() => {
						imgControls.start('visible')
					}}
				>
					<AnimatedText className="text-[20px]" text="HAPPYㅤNEWㅤFAV" />
				</motion.div>
				<motion.img
					initial="hidden"
					animate="visible"
					transition={{
						duration: 0.2,
						type: 'spring',
						damping: 11,
						delay: 1.5
					}}
					className="w-[194px]"
					variants={imgVariants}
					onAnimationComplete={() => {
						textControls.start('visible')
					}}
					src={Logo}
				/>

				<motion.div
					onAnimationComplete={() => {
						buttonControls.start('visible')
					}}
					initial="hidden"
					animate={textControls}
					variants={container}
				>
					<AnimatedText className="text-[48px] font-medium" text="PIERONG" />
				</motion.div>
			</div>
			<motion.div initial="hidden" animate={buttonControls} variants={container} className="flex space-y-5 flex-col">
				<h1 className="text-center text-xl">sns로 간편 가입하기</h1>
				<div className="flex justify-between space-x-6">
					<button
						onClick={() => authLogin('naver')}
						className="bg-[#03C75A]  flex  justify-center items-center rounded-full shadow-md w-10 h-10"
					>
						<img className="w-5/12" src={Naver} />
					</button>
					<button
						onClick={() => authLogin('kakao')}
						className="bg-[#FEE500] flex  justify-center items-center rounded-full shadow-md w-10 h-10"
					>
						<img className="w-7/12" src={Kakao} />
					</button>
					<button
						onClick={() => authLogin('google')}
						className="bg-white flex  justify-center items-center rounded-full shadow-md w-10 h-10"
					>
						<img className="w-7/12" src={Google} />
					</button>
				</div>
			</motion.div>
		</div>
	)
}

export default Splash
