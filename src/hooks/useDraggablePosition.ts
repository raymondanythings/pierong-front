import { ForwardedRef, MutableRefObject, useCallback, useEffect, useState } from 'react'

function useDraggablePosition(ref: MutableRefObject<HTMLDivElement | null>) {
	const [positon, setPosition] = useState({
		startX: 0,
		endX: 0,
		startY: 0,
		endY: 0
	})

	const setSizePerTarget = useCallback(() => {
		if (ref?.current) {
			const startY = ref.current.offsetTop
			const endY = startY + ref.current.offsetHeight
			const startX = ref.current.offsetLeft
			const endX = startX + ref?.current.offsetWidth
			setPosition(() => ({
				startY,
				endY,
				startX,
				endX
			}))
		}
	}, [ref.current])

	useEffect(() => {
		setSizePerTarget()
	}, [ref.current])
	return positon
}
export default useDraggablePosition
