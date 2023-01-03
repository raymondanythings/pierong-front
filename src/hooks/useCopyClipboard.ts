import { UserApi } from 'api'
import React from 'react'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import store from 'store'

interface useCopyClipboardArgs {
	confirm?: () => void
	cancel?: () => void
}

const useCopyClipboard = (args?: useCopyClipboardArgs) => {
	const { setPopup, refreshPopup, isMobile, userId, user: loggedInUser } = store()
	const { data: { data: roomUser } = {}, refetch: userRefetch } = useQuery(
		['room', 'user', userId],
		() => UserApi.getUserDetail(userId || ''),
		{
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId
		}
	)
	const { cancel, confirm } = args || {}

	const location = useLocation()
	const copyUrlOnClipboard = () => {
		if (isMobile && roomUser && loggedInUser) {
			const roomNick = roomUser.nickname
			const loggedInUserNick = loggedInUser.nickname
			navigator.share({})
		} else {
			window.navigator.clipboard.writeText(window.location.origin + location.pathname).then((res) => {
				setPopup({
					key: 'session',
					isOpen: true,
					message: 'URL이 클립보드에 복사되었습니다.',
					payload: {
						confirm: () => {
							refreshPopup()
							confirm && confirm()
						},
						cancel: () => {
							refreshPopup()
							cancel && cancel()
						}
					}
				})
			})
		}
	}
	return { copyUrlOnClipboard }
}

export default useCopyClipboard
