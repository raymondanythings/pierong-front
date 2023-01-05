import { ComponentType, useLayoutEffect } from 'react'
import store from 'store'

const withNavigation = (Component: ComponentType<any>) => {
	return function (props?: any) {
		const { setNav } = store()
		useLayoutEffect(() => {
			setNav()

			return () => setNav()
		}, [])
		return <Component {...props} />
	}
}

export default withNavigation
