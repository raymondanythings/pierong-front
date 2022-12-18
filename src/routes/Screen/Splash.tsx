import { useState } from 'react'
import Logo from 'assets/icons/logo.png'
import { motion, useAnimationControls } from 'framer-motion'
import AnimatedText from 'components/animation/AnimatedText'
import useAuth from 'hooks/useAuth'

import Google from 'assets/icons/google.png'
import Kakao from 'assets/icons/kakao.png'
import Naver from 'assets/icons/naver.png'

const container = {
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
const Splash = () => {
	const textControls = useAnimationControls()
	const buttonControls = useAnimationControls()
	const { authLogin } = useAuth()
	return (
		<div className="relative h-screen flex items-end justify-center pb-10">
			<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-10 items-center">
				<motion.img
					initial={{ scale: 0, rotateZ: 320 }}
					animate={{ scale: 1, rotateZ: 360 }}
					transition={{
						duration: 0.2,
						type: 'spring',
						damping: 11
					}}
					onAnimationComplete={() => {
						textControls.start('visible')
					}}
					src={Logo}
				/>

				<motion.div
					onAnimationComplete={() => {
						buttonControls.start('visible')
					}}
					className="App"
					initial="hidden"
					animate={textControls}
					variants={container}
				>
					<AnimatedText text="PIERONG" />
				</motion.div>
			</div>
			<motion.div initial="hidden" animate={buttonControls} variants={container} className="flex flex-col space-y-2">
				<button onClick={() => authLogin('google')} className="bg-white flex items-center py-2 px-4 rounded-lg  shadow-md">
					<img className="w-4 mr-2" src={Google} />
					<span className="text-black">구글로 시작하기</span>
				</button>
				<button onClick={() => authLogin('kakao')} className="bg-[#FEE500] flex items-center py-2 px-4 rounded-lg shadow-md">
					<img className="w-4 mr-2" src={Kakao} />
					<span className="text-black">카카오로 시작하기</span>
				</button>
				<button onClick={() => authLogin('naver')} className="bg-[#03C75A]  flex items-center py-2 px-4 rounded-lg shadow-md">
					<img className="w-4 mr-2" src={Naver} />
					<span className="text-white">네이버로 시작하기</span>
				</button>
			</motion.div>
		</div>
	)
}

export default Splash
