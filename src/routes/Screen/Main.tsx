import axios from 'api'
import useAuth from 'hooks/useAuth'
import withNavigation from 'layout/withNavigation'

const Main = () => {
	const { authLogin } = useAuth()

	const getUser = async () => {
		const res = await axios.post('/login')
		console.log(res)
	}

	return (
		<>
			Main
			<button onClick={() => getUser()}>ddfdf</button>
			<button onClick={() => authLogin('google')}>google</button>
			<button onClick={() => authLogin('kakao')}>kakao</button>
			<div id="naver_id_login"></div>
			<button onClick={() => authLogin('naver')}>naver</button>
		</>
	)
}

export default withNavigation(Main)
