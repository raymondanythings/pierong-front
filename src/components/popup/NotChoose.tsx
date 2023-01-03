import * as animationData from 'lottie/twinkle5.json'
import { motion } from 'framer-motion'
import store from 'store'

import { useCallback } from 'react'
import useCopyClipboard from 'hooks/useCopyClipboard'
import html2canvas from 'html2canvas'
import { UserDetail } from 'types'

const NotChoose = ({ owner }: { owner: UserDetail }) => {
	const [setDragState, refreshPopup, isMobile] = store((state) => [state.setDragState, state.refreshPopup, state.isMobile])
	const { copyUrlOnClipboard } = useCopyClipboard()
	const onCaptureImage = useCallback(() => {
		const main = document.querySelector('main')
		if (main) {
			html2canvas(main).then(async (canvas) => {
				const link = document.createElement('a')
				link.download = owner.nickname + ' 의 베이킹룸'
				// link.href = canvas.toDataURL()
				await navigator
					.share({
						title: 'Lee Martin',
						text: 'Netmaker. Playing the Internet in your favorite band for nearly two decades.',
						url: 'https://leemartin.dev'
					})
					.then(() => {
						refreshPopup()
					})
					.catch((error) => refreshPopup())
				// canvas.toBlob((blob) => {
				// 	if (blob) {
				// 		const file = new File([blob], owner.nickname + ' 의 베이킹룸', {
				// 			type: 'image/png'
				// 		})
				// 		console.log(blob)
				// 		console.log(isMobile)
				// 		console.log(navigator.share)
				// 		if (isMobile) {
				// 			navigator.share({
				// 				title: document.title,
				// 				text: 'Hello World',
				// 				url: 'https://developer.mozilla.org'
				// 			})
				// 			// window.navigator
				// 			// 	.share({
				// 			// 		// files: [file],
				// 			// 		title: owner.nickname + ' 의 베이킹룸',
				// 			// 		text: owner.nickname + ' 의 베이킹룸 에서 보낸 이미지입니다.',
				// 			// 		url: 'https://pierong.site'
				// 			// 	})
				// 			// 	.then(() => console.log('OK'))
				// 		}
				// 	}
				// })

				document.body.appendChild(link)
				// link.click()
				document.body.removeChild(link)
			})
		}
	}, [])
	return (
		<div className="p-2 px-6 w-full flex flex-col">
			<div className="grow flex flex-col justify-center items-center space-y-4">
				<h1 className="text-center text-xs font-bold">페브가 든 파이는 못 고르셨지만 편지는 잘 보내졌어요!</h1>
				<div className="relative overflow-hidden rounded-lg border border-dashed flex justify-center aspect-square items-center">
					<div className="absolute w-[150%] h-[150%]"></div>
					<motion.div
						className="w-2/3 p-4"
						initial={{
							scale: 0,
							rotateZ: 0,
							opacity: 0
						}}
						animate={{
							scale: 1,
							rotateZ: 360,
							opacity: 1
						}}
						transition={{
							type: 'spring',
							damping: 20,
							bounce: 0.8
						}}
					>
						<img src="/logo.png" />
					</motion.div>
					<h1 className="font-bold text-sm absolute bottom-4">다음 기회에 !</h1>
					<div
						className="absolute w-10 h-10 border border-solid bottom-1 right-1 rounded-full bg-mainTeal flex items-center justify-center"
						onClick={onCaptureImage}
					>
						<svg
							width="25"
							height="25"
							viewBox="0 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<rect width="25" height="25" fill="url(#pattern1)" />
							<defs>
								<pattern id="pattern1" patternContentUnits="objectBoundingBox" width="1" height="1">
									<use xlinkHref="#image1_500_1870" transform="scale(0.0104167)" />
								</pattern>
								<image
									id="image1_500_1870"
									width="96"
									height="96"
									xlinkHref="data:image/png;base64,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"
								/>
							</defs>
						</svg>
					</div>
				</div>
				<div className="flex flex-col items-center space-y-2">
					<p className="text-xs text-center text-[#767676]">친구들에게 공유해 페브를 노려보세요!</p>
				</div>
				<div className="flex space-x-3">
					<button
						className="modal-btn"
						onClick={() => {
							setDragState({
								state: 'idle',
								dragged: null,
								item: null
							})
							refreshPopup()
						}}
					>
						확인
					</button>
					<button className="modal-btn" onClick={copyUrlOnClipboard}>
						공유하기
					</button>
				</div>
			</div>
		</div>
	)
}

export default NotChoose
