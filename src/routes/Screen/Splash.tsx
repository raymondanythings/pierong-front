import { useLayoutEffect, useState } from 'react'
import Logo from 'assets/icons/logo.png'
import { motion, useAnimationControls, Variants } from 'framer-motion'
import AnimatedText from 'components/animation/AnimatedText'
import useAuth from 'hooks/useAuth'

import Google from 'assets/icons/google.png'
import Kakao from 'assets/icons/kakao.png'
import Naver from 'assets/icons/naver.png'
import store from 'store'
import { Link } from 'react-router-dom'
import NickNameChangePopup from 'components/Modal/NickNameChangePopup'
import CustomModal from 'components/Modal'

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
	const { authLogin, logout } = useAuth()
	const [userInfo, setUser] = store((state) => [state.user, state.setUser])
	const [popup, setPopup] = store((state) => [state.popup, state.setPopup])
	const refetch = (nickname: string) => {
		userInfo && setUser({ ...userInfo, nickname })
	}

	useLayoutEffect(() => {
		titleControls.start('visible')
	}, [])
	return (
		<div className="relative flex flex-col h-full items-center justify-center">
			<div className="w-full flex flex-col justify-center items-center flex-grow">
				<motion.div
					initial="hidden"
					animate={titleControls}
					variants={container}
					onAnimationComplete={() => {
						imgControls.start('visible')
					}}
				>
					<AnimatedText className="text-[20px]" text="HAPPY NEW FÉVE" />
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
					animate="visible"
					transition={{
						duration: 0.2,
						type: 'spring',
						damping: 11,
						delay: 1.5
					}}
					variants={container}
				>
					<AnimatedText className="text-[48px] font-medium" text="파이롱" />
				</motion.div>
			</div>
			<motion.div initial="hidden" animate={buttonControls} variants={container} className="flex space-y-5 flex-col pb-8">
				{userInfo ? (
					<div className="flex flex-col justify-center items-center">
						<div className="flex flex-col items-center text-center border border-solid rounded-2xl w-full py-2 space-y-1">
							<h1 className="font-bold">로그인한 계정</h1>
							<div className="text-center text-xl flex items-center relative">
								{userInfo.nickname || '임시닉네임'}
								<img
									onClick={() => {
										setPopup({
											message: '닉네임변경',
											key: 'changeNickName',
											isOpen: true,
											btnHide: true
										})
									}}
									className="w-5 h-5 absolute left-full"
									src="/image/pancel.png"
								/>
							</div>
						</div>
						<div className="mt-2 flex w-full justify-between space-x-2">
							<button
								onClick={logout}
								className="flex items-center rounded-2xl border-mainTeal border-2 border-solid bg-white p-7 py-2 shadow-b text-center"
							>
								다른계정
								<br />
								사용하기
							</button>
							<Link
								className="flex items-center rounded-2xl border-mainTeal border-2 border-solid bg-white p-7 py-2 shadow-b text-center"
								to={`/room/${userInfo.email}`}
							>
								내계정
								<br />
								계속하기
							</Link>
						</div>
					</div>
				) : (
					<>
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
						<h3 className="text-center text-xs leading-4">
							파이롱 가입 시 <ins className="text-[#57765E] underline-offset-4">서비스 이용 약관</ins>에<br />
							동의하였음으로 간주됩니다.
						</h3>
					</>
				)}
			</motion.div>
			{popup?.key === 'changeNickName' ? (
				<CustomModal>
					<NickNameChangePopup refetch={refetch} />
				</CustomModal>
			) : null}
		</div>
	)
}

export default Splash
