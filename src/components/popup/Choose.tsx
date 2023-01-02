import Lottie from 'react-lottie'
import * as animationData from 'lottie/twinkle5.json'
import { motion } from 'framer-motion'
import store from 'store'
import { FeveDetail } from 'types/Response'
import { FC } from 'react'
import useCopyClipboard from 'hooks/useCopyClipboard'

interface ChooseProps {
	feveDetail: FeveDetail
}
const Choose: FC<ChooseProps> = ({ feveDetail }) => {
	const [setDragState, refreshPopup] = store((state) => [state.setDragState, state.refreshPopup])
	const { copyUrlOnClipboard } = useCopyClipboard()
	return (
		<div className="p-2 px-6 w-full flex flex-col">
			<div className="grow flex flex-col justify-center items-center space-y-4">
				<h1 className="text-center font-bold">축하합니다! 페브가 든 파이를 고르셨어요!</h1>
				<div className="relative rounded-lg border border-dashed flex justify-center aspect-square items-center">
					<div className="absolute">
						<Lottie
							isClickToPauseDisabled
							options={{
								animationData,
								autoplay: true,
								rendererSettings: {
									preserveAspectRatio: 'xMidYMid slice'
								},
								loop: true
							}}
						/>
					</div>
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
						<img src={`/image/feve/${feveDetail.feveId}.png`} />
					</motion.div>
				</div>
				<div className="flex flex-col items-center space-y-2">
					<span className="font-bold text-center">{feveDetail.feveDescription}</span>
					<p className="text-xs font-bold text-center">- 파이의 다른 조각들을 모두 나눈후에 페브함에 저장됩니다.</p>
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

export default Choose
