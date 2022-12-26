import App from 'routes/Screen/App'
import { createRoutesFromElements, Route, Routes } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Main from './Screen/Main'
import OAuth from './Screen/OAuth'
import Loading from './Screen/Loading'
import Splash from './Screen/Splash'
import { LoginApi } from 'api'
import store from 'store'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path=""
			element={<App />}
			loader={async () => {
				const atk = localStorage.getItem('X-ACCESS-TOKEN')
				try {
					const userInfo = await LoginApi.checkAccessToken(atk || '')
					return { userInfo, atk }
				} catch (err: any) {
					if (err) {
						console.log(err, '???')
						// 무조건 재로그인  ㄱ
					}
					return null
				}
			}}
		>
			<Route path="" element={<Splash />} />
			<Route path="main" element={<Main />} />
			<Route path="testtt" element={<Main />} />
			<Route path="oauth" element={<OAuth />} />
			<Route path="loading" element={<Loading />} />
			<Route path="splash" element={<Splash />} />
		</Route>
	)
)

export default router
