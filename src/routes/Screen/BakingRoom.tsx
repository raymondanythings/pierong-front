import { PieApi, UserApi } from 'api'
import Loading from 'components/animation/Loading'
import withNavigation from 'layout/withNavigation'
import { useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import store from 'store'
import Main from './Main'

const BakingRoom = () => {
	const { userId = undefined } = useParams() as { userId?: string }
	const navigate = useNavigate()
	const setPopup = store((state) => state.setPopup)
	if (!userId) {
		navigate('/')
		return null
	} else {
		// const userEmail = atob(userId)
		// const userEmail = btoa(userId)
		const { data, isLoading: isPieLoading } = useQuery(['room', 'pie', userId], () => PieApi.getUserCake({ userId }), {
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId,
			onError(err: any) {
				if (err.response.data.code === '2003') {
					setPopup({
						isOpen: true,
						message: '유저가 존재하지 않습니다.',
						key: 'session'
					})
					navigate('/')
				}
			}
		})
		const { data: userResponse, isLoading: isUserLoading } = useQuery(['room', 'user', userId], () => UserApi.getUserDetail(userId), {
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId
		})

		const user = userResponse?.data
		const isLoading = isPieLoading || isUserLoading || !user
		return isLoading ? <Loading /> : <Main userId={userId} user={user} />
	}
}

export default withNavigation(BakingRoom)
