import axios from 'api'
import Modal from 'components/Modal'
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
			<Modal>????</Modal>
		</>
	)
}

export default withNavigation(Main)
