import store from 'store'
import Google from 'assets/icons/google.png'
import Kakao from 'assets/icons/kakao.png'
import Naver from 'assets/icons/naver.png'
import { useNavigate } from 'react-router-dom'
import { useCallback, useState } from 'react'
import { UserApi } from 'api'
import useAuth from 'hooks/useAuth'

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

const MyPage = () => {
	const navigate = useNavigate()
	const { logout } = useAuth()
	const [isThisTrue, setIsThisTrue] = useState(false)
	const { user, setPopup } = store((state) => ({ user: state.user, setPopup: state.setPopup }))

	const onLogout = useCallback(() => {
		logout()
		navigate('/')
	}, [])

	const onWithdraw = useCallback(async () => {
		const res = await UserApi.getWithdraw()
		if (res?.message === 'SUCCESS') {
			onLogout()
		}
	}, [])
	return (
		<div className="w-full px-4 flex flex-col space-y-4">
			<div className="mx-auto w-[180px] h-[60px] flex justify-center items-center bg-mainTeal p-2 z-30 border border-solid max-w-screen-default">
				<div className="border-[#EAE6DA] border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5">
					<div className="relative">
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
							className="w-3 h-3 ml-1 absolute top-1/2  -translate-y-1/2 left-full"
							src="/image/icon/pancel.png"
						/>
					</div>
				</div>
			</div>
			{user ? (
				<div className="shadow-btn py-3 items-center justify-between px-4">
					<div
						className={`w-7 h-7 ${
							user.socialType === 'google' ? 'bg-white' : user.socialType === 'kakao' ? 'bg-[#FEE500]' : 'bg-[#03C75A]'
						} rounded-full p-1.5`}
					>
						<img src={social[user.socialType].src} />
					</div>
					<span className="grow text-center">{social[user.socialType].title}로 로그인중</span>
				</div>
			) : null}
			<div className="shadow-btn py-3 px-4">
				<span className="text-center" onClick={() => navigate('/privacy')}>
					파이롱 <ins className="text-[#57765E] underline-offset-4">서비스 이용 약관 </ins>
					동의중
				</span>
			</div>
			<div className="shadow-btn py-3 px-4">
				<span className="text-center" onClick={() => setIsThisTrue(true)}>
					나의 <strong className="text-mainTeal">베이킹룸</strong> 삭제하기
				</span>
			</div>
			<div className="flex justify-center space-x-2">
				<button className="modal-btn py-1.5 text-sm font-normal min-w-min px-6">공유하기</button>
				<button onClick={onLogout} className="modal-btn py-1.5 text-sm font-normal min-w-min px-6">
					로그아웃
				</button>
			</div>
			{isThisTrue ? (
				<div
					className="fixed top-0 left-0 w-screen h-screen z-[100] flex justify-center items-center"
					style={{
						marginTop: 0
					}}
				>
					<div className="absolute w-full h-full bg-gray-600 opacity-30" onClick={() => setIsThisTrue(false)} />
					<div className="bg-gray-500 -z-10 w-full h-full absolute top-0 left-0 opacity-50"></div>
					<div
						className={`w-4/5 min-h-[150px] rounded-2xl bg-mainTeal p-2 flex justify-center items-stretch border-black border border-solid relative`}
					>
						<div className="top-icon z-30">
							<div className="bg-mainBeige border-black border border-solid flex justify-center items-center grow rounded-full">
								<img src={`/image/icon/logo.png`} className="w-3/4 max-w-[23px] max-h-[23px]" />
							</div>
						</div>

						<div className="grow flex flex-col justify-center items-center bg-mainBeige border-black border border-solid py-5 overflow-y-scroll max-h-[calc(var(--vh,1vh)_*_80)] rounded-2xl relative">
							<h1 className="text-center leading-5 pb-3">
								삭제된 정보는 복구할 수 없어요.
								<br />
								신중히 생각하고 삭제 버튼을 눌러주세요!
							</h1>
							<div className="absolute bottom-2 flex space-x-2">
								<button onClick={onWithdraw} className="modal-btn py-1.5 text-sm font-normal min-w-min px-6">
									삭제
								</button>
								<button
									onClick={() => setIsThisTrue(false)}
									className="modal-btn py-1.5 text-sm font-normal bg-transparent text-black min-w-min px-6"
								>
									취소
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default MyPage
