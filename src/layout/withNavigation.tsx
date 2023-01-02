import { ComponentType, useLayoutEffect } from 'react'
import store from 'store'

const withNavigation = (Component: ComponentType<any>) => {
	return function (props?: any) {
		const { setNav, isLogin } = store()
		useLayoutEffect(() => {
			if (isLogin) {
				setNav()
			}
			return () => {
				isLogin && setNav()
			}
		}, [])
		return <Component {...props} />
	}
}

export default withNavigation
