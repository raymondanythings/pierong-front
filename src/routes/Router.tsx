import App from 'routes/Screen/App'
import { createRoutesFromElements, Outlet, Route, Routes } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import OAuth from './Screen/OAuth'
import Loading from './Screen/Loading'
import Splash from './Screen/Splash'
import { LoginApi } from 'api'
import BakingRoom from './Screen/BakingRoom'
import axios from 'axios'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route
			path=""
			element={<App />}
			loader={async () => {
				const atk = localStorage.getItem('X-ACCESS-TOKEN')
				try {
					if (!atk) {
						return null
					}
					const { userInfo, atk: atkResponse } = await LoginApi.checkAccessToken(atk || '')
					if (atkResponse) {
						axios.defaults.headers['X-ACCESS-TOKEN'] = atkResponse
					}
					return { userInfo, atk: atkResponse }
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
			<Route path="oauth" element={<OAuth />} />
			<Route path="loading" element={<Loading />} />
			<Route path="splash" element={<Splash />} />
			<Route path="room" element={<Outlet />}>
				<Route path=":userId" element={<BakingRoom />} />
				{/* <Route path="*" element={<BakingRoom />} /> */}
			</Route>
		</Route>
	)
)

export default router
