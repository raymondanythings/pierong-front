import App from 'routes/Screen/App'
import { createRoutesFromElements, Outlet, Route } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import OAuth from './Screen/OAuth'
import Splash from './Screen/Splash'
import BakingRoom from './Screen/BakingRoom'
import { loginCheckLoader } from 'libs/common/loader'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="" element={<App />} loader={loginCheckLoader}>
			<Route path="" element={<Splash />} />
			<Route path="oauth" element={<OAuth />} />
			<Route path="splash" element={<Splash />} />
			<Route path="room" element={<Outlet />}>
				<Route path=":userId" element={<BakingRoom />} />
				{/* <Route path="*" element={<BakingRoom />} /> */}
			</Route>
		</Route>
	)
)

export default router
