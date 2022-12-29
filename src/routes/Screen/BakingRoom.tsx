import { PieApi } from 'api'
import Loading from 'components/animation/Loading'
import withNavigation from 'layout/withNavigation'
import React from 'react'
import { useQuery } from 'react-query'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Main from './Main'

const BakingRoom = () => {
	const { userId = undefined } = useParams() as { userId?: string }
	const navigate = useNavigate()
	if (!userId) {
		navigate('/')
		return null
	} else {
		const { data, isLoading } = useQuery(['room', 'pie', userId], () => PieApi.getUserCake({ userId }), {
			cacheTime: Infinity,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId
		})
		return isLoading ? <Loading /> : <Main userId={userId} />
	}
}

export default withNavigation(BakingRoom)
