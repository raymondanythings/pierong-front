import React from 'react'
import { useLocation } from 'react-router-dom'
import store from 'store'

interface useCopyClipboardArgs {
	confirm?: () => void
	cancel?: () => void
}

const useCopyClipboard = (args?: useCopyClipboardArgs) => {
	const { cancel, confirm } = args || {}
	const location = useLocation()
	const { setPopup, refreshPopup } = store()
	const copyUrlOnClipboard = () => {
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
	return { copyUrlOnClipboard }
}

export default useCopyClipboard
