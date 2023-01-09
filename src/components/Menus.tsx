import { Dispatch, FC, SetStateAction, useCallback } from 'react'
import { motion, Variants } from 'framer-motion'
import store from 'store'
import Google from 'assets/icons/google.png'
import Kakao from 'assets/icons/kakao.png'
import Naver from 'assets/icons/naver.png'
import { useNavigate } from 'react-router-dom'
import useCopyClipboard from 'hooks/useCopyClipboard'
import useAuth from 'hooks/useAuth'
const menuVariants: Variants = {
	initial: {
		right: '-100%'
	},
	animate: {
		right: 0
	}
}

const social = {
	google: {
		src: Google,
		title: '구글'
	},
	kakao: {
		src: Kakao,
		title: '카카오'
	},
	naver: {
		src: Naver,
		title: '네이버'
	}
}
type NavKey = 'history' | 'feve' | 'share' | 'mypage'
const Menus = () => {
	const { logout } = useAuth()
	const { user, setPopup, setToggle } = store((state) => ({
		user: state.user,
		setPopup: state.setPopup,
		toggle: state.toggleNav,
		setToggle: state.setToggleNav
	}))
	const onClosePopup = useCallback(() => {
		setToggle(false)
	}, [])
	const navigate = useNavigate()
	const { copyUrlOnClipboard } = useCopyClipboard()

	const onNavClick = (key: NavKey) => {
		if (key === 'feve') {
			navigate('/room/feve', { relative: 'route' })
		} else if (key === 'share') {
			copyUrlOnClipboard()
		} else {
			setPopup({
				key,
				isOpen: true,
				btnHide: true
			})
		}
	}
	const onLogout = useCallback(() => {
		logout()
		navigate('/')
	}, [])
	return (
		<div className="absolute w-full h-full top-0 left-0 z-50">
			<motion.div
				animate={{
					backgroundColor: 'rgba(0,0,0,0.3)'
				}}
				initial={{
					backgroundColor: 'rgba(0,0,0,0.0)'
				}}
				exit={{
					backgroundColor: 'rgba(0,0,0,0.0)'
				}}
				className="absolute w-full h-full left-0 top-0 -z-[1]"
				onClick={onClosePopup}
			/>
			<motion.div
				className="absolute solid-box border-r-0 rounded-l-2xl bg-mainTeal pl-3 py-3 h-full min-w-[60%]"
				initial="initial"
				animate="animate"
				exit="initial"
				variants={menuVariants}
				style={{
					right: 'calc(var(--main-mr))'
				}}
			>
				<div className="flex flex-col bg-mainBeige solid-box border-r-0 w-full h-full rounded-l-2xl p-3 ">
					<div>
						<div className="py-2 flex justify-end mb-2">
							<svg
								onClick={onClosePopup}
								width="25"
								height="25"
								viewBox="0 0 25 25"
								fill="none"
								className="relative -right-2"
								xmlns="http://www.w3.org/2000/svg"
								xmlnsXlink="http://www.w3.org/1999/xlink"
							>
								<rect width="25" height="25" fill="url(#xbutton)" />
								<defs>
									<pattern id="xbutton" patternContentUnits="objectBoundingBox" width="1" height="1">
										<use xlinkHref="#image0_711_1510" transform="scale(0.0104167)" />
									</pattern>
									<image
										id="image0_711_1510"
										width="96"
										height="96"
										xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAACXBIWXMAAAsTAAALEwEAmpwYAAACZUlEQVR4nO2dzWoUQRhFKy4cRR+sX+B2bVKVJ+iFSNW29yIk4FLQd3AhPpQgGINLpWYc8C9mJj3W99P3wCwD9547aZKZojsEQgghhBBCCCGEEEIIUc7Zj5cMeIbHsabXsaSbWPLHseYXwzRtgnOGadrEml/Gmj6NJX2NJb05f37+pHuQrfyav/38Gkt673mEYZo2rePvvdsIXYPM8/xgrPnLH0EcjzDcJn83wE1z0jVQrOnzX8M4HGH4l/ztAPm6e6hY8uWtgRyNMNwlfzfApcpg1kcYtHfEjIex5Hd3vDs+XMwXj4IxYKWbmaCeO5kL7LGL2eCeOlguAMPZzReBwcxuCsFQVnfFYCCj24JQnM19USjMtJrCUJSlKxqKQ0EGUSQFYO3yJUWA8uWEgPLlxIDy5QSB8uVEgfLl3q2g/PuBE4ij/IVgwQiUfyJwjxEo/8TgiBEoX/hMzqj53I51cMhvwto/21E7QqF8uREK5cuNUCj/vwAOIAd4CTIkv/JSJC+/coTFDPxHTA7wowgb8sOCnyEnkr+HIywE/EJGDvArSR/y9/BydCDgsRQ5eDBLEB5NFISHcwXh8XRBNPxlAgUZRNBUHIqydEFjYSjMtLqiUJxtNQVhIKP7YjCU1W0hGMzsrggMZ/dRIBjuYDa4hy7mAnvqZCaox27qb2rqveNY0iuVwSRGqOkq9KTdKXz73ADn8o+8efdZ39vXt4cXrED+ISM0F91vXz/W/HYt8tU9wKGBGU/bCLvHeOTrdgt3z/J/GaGmq9Z5/wiT5iIIIvcgmzU/xIcQQgghhBBCCCGEEBKO4jvQGH7JWfI8XwAAAABJRU5ErkJggg=="
									/>
								</defs>
							</svg>
						</div>
						<div className="mx-auto h-[60px] flex justify-center items-center bg-mainTeal p-2 z-30 border border-solid max-w-screen-default">
							<div className="border-[#EAE6DA] border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5 px-2">
								<div className="relative flex items-center">
									{user?.nickname}
									<small
										className="ml-1"
										style={{
											fontSize: '0.75em'
										}}
									>
										의 베이킹룸
									</small>
									<img
										onClick={() => {
											setPopup({
												message: '닉네임변경',
												key: 'changeNickName',
												isOpen: true,
												btnHide: true
											})
										}}
										className="w-3 h-3 ml-1"
										src="/image/icon/pancel.png"
									/>
								</div>
							</div>
						</div>
						{user ? (
							<div className="flex items-center space-x-3 py-3">
								<div
									className={`w-5 h-5 ${
										user.socialType === 'google'
											? 'bg-white'
											: user.socialType === 'kakao'
											? 'bg-[#FEE500]'
											: 'bg-[#03C75A]'
									} rounded-full p-1`}
								>
									<img src={social[user.socialType].src} />
								</div>
								<span className="grow text-graytext text-xs">{social[user.socialType].title}로 로그인중</span>
							</div>
						) : null}
						<div className="flex flex-col space-y-3">
							<div className="shadow-btn flex justify-start items-center py-2 px-4" onClick={() => onNavClick('mypage')}>
								<img src="/image/icon/person.png" className="w-3/4 max-w-[23px] max-h-[23px] mr-3" />
								<span className="text-sm">마이 페이지</span>
							</div>
							<div className="shadow-btn flex justify-start items-center py-2 px-4" onClick={() => onNavClick('feve')}>
								<img src="/image/icon/crown.png" className="w-3/4 max-w-[23px] max-h-[23px] mr-3" />
								<span className="text-sm">My 수집창</span>
							</div>
							<div className="shadow-btn flex justify-start items-center py-2 px-4" onClick={() => onNavClick('history')}>
								<img src="/image/icon/message.png" className="w-3/4 max-w-[23px] max-h-[23px] mr-3" />
								<span className="text-sm">받은 메세지</span>
							</div>
						</div>
					</div>
					<div className="mt-5 mb-4  border-t-[1px] border-solid border-mainTeal" />
					<div className="flex flex-col space-y-3">
						<div className="shadow-btn flex justify-start items-center py-2 px-4">
							<img src="/image/icon/logo.png" className="w-3/4 max-w-[23px] max-h-[23px] mr-3" />
							<span className="text-sm">파이롱 설명서</span>
						</div>
						<div
							className="shadow-btn flex justify-start items-center py-2 px-4"
							onClick={() => {
								window.open('https://forms.gle/6hyzXtku1F3EzyoD6')
							}}
						>
							<img src="/image/icon/survey_black.png" className="w-3/4 max-w-[23px] max-h-[23px] mr-3" />
							<span className="text-sm">설문조사</span>
						</div>
					</div>
					<div className="mt-5 mb-4  border-t-[1px] border-solid border-mainTeal" />
					<div className="w-full h-[100px] border border-solid border-mainTeal rounded-xl"></div>
					<div
						className="flex items-center text-mainTeal py-2"
						onClick={() => {
							window.open('https://github.com/6floorpeople')
						}}
					>
						<img src="/image/icon/github.png" className="w-3/4 max-w-[23px] max-h-[23px] mr-1" />
						<span className="text-sm">6층 사람들</span>
					</div>

					<div className="grow flex flex-col justify-end space-y-2">
						<button
							onClick={() => onNavClick('share')}
							className="w-full rounded-xl h-10 bg-mainTeal solid-box border-black text-white font-thin"
						>
							공유하기
						</button>
						<button onClick={onLogout} className="w-full rounded-xl h-10 solid-box border-mainTeal text-mainTeal">
							로그아웃
						</button>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default Menus
