import { useLayoutEffect, useState } from 'react'

export function useTitle(title: string) {
	const [documentTitle, setDocumentTitle] = useState(title)

	useLayoutEffect(() => {
		document.title = documentTitle
	}, [documentTitle])

	return {
		documentTitle,
		setDocumentTitle
	}
}
