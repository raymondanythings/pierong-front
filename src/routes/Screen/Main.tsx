import axios from 'api'
import Modal from 'components/Modal'
import useAuth from 'hooks/useAuth'
import withNavigation from 'layout/withNavigation'
import store from 'store'

const Main = () => {
	const { atk } = store()

	console.log(atk)
	return (
		<>
			<Modal>????</Modal>
		</>
	)
}

export default withNavigation(Main)
