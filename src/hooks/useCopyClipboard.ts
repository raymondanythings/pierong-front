import { UserApi } from 'api'
import { useQuery } from 'react-query'
import { useLocation } from 'react-router-dom'
import store from 'store'

interface useCopyClipboardArgs {
	title?: string
	text?: string
	url?: string
	confirm?: () => void
	cancel?: () => void
}

const useCopyClipboard = (args?: useCopyClipboardArgs) => {
	const { setPopup, refreshPopup, isMobile, owner, setOwner } = store()
	const { data: { data: roomUser } = {}, refetch: userRefetch } = useQuery(
		['room', 'user', owner?.userId],
		() => UserApi.getUserDetail(owner?.userId || ''),
		{
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!owner?.userId,
			onSuccess({ data }) {
				setOwner({ ...data, userId: owner?.userId || '' })
			}
		}
	)
	const { cancel, confirm, text, title, url } = args || {}

	const location = useLocation()
	const copyUrlOnClipboard = () => {
		if (isMobile) {
			navigator.share({
				title: title ? title : `${owner?.nickname}에게 행운을`,
				text: text ? text : `${owner?.nickname}님의 파이를 선택하여 행운을 남겨주세요!`,
				url: url ? url : window.location.origin + location.pathname
			})
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
