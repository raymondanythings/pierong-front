import { ComponentType, useLayoutEffect } from 'react'
import store from 'store'

const withNavigation = (Component: ComponentType<any>) => {
	return function () {
		const { setNav, isLogin } = store()
		useLayoutEffect(() => {
			if (isLogin) {
				setNav()
			}
			return () => {
				isLogin && setNav()
			}
		}, [])
		return (
			<>
				<Component />
			</>
		)
	}
}

export default withNavigation
