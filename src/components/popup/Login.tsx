import useAuth from 'hooks/useAuth'
import Google from 'assets/icons/google.png'
import Kakao from 'assets/icons/kakao.png'
import Naver from 'assets/icons/naver.png'
import { useLocation, useNavigate } from 'react-router-dom'
const Login = () => {
	const location = useLocation()
	const navigate = useNavigate()
	const { authLogin } = useAuth(location.pathname)
	return (
		<div className="flex flex-col space-y-3">
			<h1>파이를 선택하시려면 로그인이 필요합니다.</h1>
			<div className="flex flex-col space-y-2">
				<h1 className="text-center text-xl">sns로 간편 가입하기</h1>
				<div className="flex justify-center space-x-6">
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
			</div>
			<h3 className="text-center text-xs leading-4">
				파이롱 가입 시{' '}
				<ins onClick={() => navigate('/privacy')} className="text-[#57765E] underline-offset-4">
					서비스 이용 약관
				</ins>
				에<br />
				동의하였음으로 간주됩니다.
			</h3>
		</div>
	)
}

export default Login
