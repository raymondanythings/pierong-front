import { PieApi, UserApi } from 'api'
import Loading from 'components/animation/Loading'
import { useLayoutEffect } from 'react'
import { useQuery } from 'react-query'
import { useLoaderData, useLocation, useNavigate, useParams } from 'react-router-dom'
import store from 'store'
import Main from './Main'

const BakingRoom = () => {
	const { userId = undefined } = useParams() as { userId?: string }
	const navigate = useNavigate()
	const [setPopup, setOwner, owner] = store((state) => [state.setPopup, state.setOwner, state.owner])
	if (!userId) {
		navigate('/')
		return null
	} else {
		const { isLoading: isPieLoading, refetch: pieRefetch } = useQuery(
			['room', 'pie', userId],
			(key) => {
				return PieApi.getUserPie({ userId })
			},
			{
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
			}
		)
		const {
			data: userResponse,
			isLoading: isUserLoading,
			refetch: userRefetch
		} = useQuery(['room', 'user', userId], () => UserApi.getUserDetail(userId), {
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId,
			onSuccess({ data }) {
				setOwner({ ...data, userId })
			}
		})
		useLayoutEffect(() => {
			if (userResponse?.data) {
				setOwner({ ...userResponse?.data, userId })
			}
		}, [userId])
		const user = userResponse?.data
		const isLoading = isPieLoading || isUserLoading || !user
		return isLoading ? <Loading /> : <Main userId={userId} user={user} />
	}
}

export default BakingRoom
