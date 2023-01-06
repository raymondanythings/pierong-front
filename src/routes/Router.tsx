import App from 'routes/Screen/App'
import { createRoutesFromElements, Navigate, Outlet, Route } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import OAuth from './Screen/OAuth'
import Splash from './Screen/Splash'
import BakingRoom from './Screen/BakingRoom'
import { loginCheckLoader } from 'libs/common/loader'
import Privacy from './Screen/Privacy'
import Feve from './Screen/Feve'

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route element={<App />} loader={loginCheckLoader}>
			<Route index element={<Splash />} />
			<Route path="oauth" element={<OAuth />} />
			<Route path="room" element={<Outlet />}>
				<Route path="feve" element={<Feve />} />
				<Route path=":userId" element={<BakingRoom />} />
			</Route>
			<Route path="privacy" element={<Privacy />} />
			<Route path="*" element={<Navigate to="/" />} />
		</Route>
	)
)

export default router
