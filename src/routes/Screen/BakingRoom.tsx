import { PieApi, UserApi } from 'api'
import Loading from 'components/animation/Loading'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import store from 'store'
import Main from './Main'

const BakingRoom = () => {
	const { userId = undefined } = useParams() as { userId?: string }
	const navigate = useNavigate()
	const [setPopup, setOwner] = store((state) => [state.setPopup, state.setOwner])
	if (!userId) {
		navigate('/')
		return null
	} else {
		const { data, isLoading: isPieLoading } = useQuery(['room', 'pie', userId], () => PieApi.getUserPie({ userId }), {
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId,
			onError(err: any) {
				setPopup({
					isOpen: true,
					message: '유저가 존재하지 않습니다.',
					key: 'session'
				})
				navigate('/')
			}
		})
		const { data: userResponse, isLoading: isUserLoading } = useQuery(['room', 'user', userId], () => UserApi.getUserDetail(userId), {
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId,
			onSuccess({ data }) {
				setOwner({ ...data, userId })
			}
		})

		const user = userResponse?.data
		const isLoading = isPieLoading || isUserLoading || !user
		return isLoading ? <Loading /> : <Main userId={userId} user={user} />
	}
}

export default BakingRoom
