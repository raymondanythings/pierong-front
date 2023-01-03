import App from 'routes/Screen/App'
import { createRoutesFromElements, Navigate, Outlet, Route } from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import OAuth from './Screen/OAuth'
import Splash from './Screen/Splash'
import BakingRoom from './Screen/BakingRoom'
import { loginCheckLoader } from 'libs/common/loader'

// const Privacy = () => {
// 	window.location.href = 'https://massive-anteater-e81.notion.site/2103bde69c2f4a8d96af2c78db70d41a'
// 	return <></>
// }

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="" element={<App />} loader={loginCheckLoader}>
			<Route path="" element={<Splash />} />
			<Route path="oauth" element={<OAuth />} />
			<Route path="splash" element={<Splash />} />
			<Route path="room" element={<Outlet />}>
				<Route path=":userId" element={<BakingRoom />} />
			</Route>
			{/* <Route path="privacy" element={<Privacy />} /> */}
			<Route path="*" element={<Navigate to="/" />} />
		</Route>
	)
)

export default router
