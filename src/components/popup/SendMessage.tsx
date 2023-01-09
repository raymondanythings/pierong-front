import { PieApi } from 'api'
import { FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import store from 'store'
import { ErrorMessage } from '@hookform/error-message'
import { AxiosError } from 'axios'
import Choose from './Choose'
import { FeveDetail } from 'types/Response'
import { UserDetail } from 'types'
import NotChoose from './NotChoose'
import { AnimatePresence, motion } from 'framer-motion'

interface MessageForm {
	memoContent: string
}

interface SendMessageProps {
	userPieId?: string
	ownerEmail?: string
	owner: UserDetail
	refetch: () => void
}

const SendMessage: FC<SendMessageProps> = ({ refetch, ownerEmail, userPieId, owner }) => {
	const { chooseState, nickname, refreshPopup, setDragState, dragState, clickedState } = store((state) => ({
		clickedState: state.clickedPieState,
		nickname: state.user?.nickname,
		setDragState: state.setDragState,
		dragState: state.dragState,
		refreshPopup: state.refreshPopup,
		setPopup: state.setPopup,
		chooseState: state.chooseState
	}))
	const textRef = useRef<HTMLTextAreaElement | null>(null)
	const handleResizeHeight = useCallback(
		(event: KeyboardEvent<HTMLTextAreaElement>) => {
			if (textRef?.current) {
				textRef.current.style.height = textRef.current.scrollHeight + 'px'
			}
		},
		[textRef?.current]
	)
	const [choosed, setChoosed] = useState<FeveDetail | null>(null)
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors }
	} = useForm<MessageForm>()

	const { ref, ...rest } = register('memoContent', {
		maxLength: {
			value: 100,
			message: '최대 100글자 까지 가능합니다.'
		},
		minLength: {
			value: 10,
			message: '친구에게 10글자 이상 써주세요!'
		}
	})

	const onChoosePie = useCallback(
		async (data: MessageForm) => {
			if (!ownerEmail || !userPieId) {
				setDragState({
					state: 'idle',
					dragged: null,
					item: null
				})
				refreshPopup()
				return
			}
			try {
				const res = await PieApi.choosePie({
					ownerEmail,
					userPieId,
					memoContent: data.memoContent,
					pieceIndex: dragState.dragged.id
				})
				if (res.message === 'SUCCESS') {
					if (res.data) {
						setChoosed(res.data)
						store.setState({ chooseState: 'choose' })
					} else {
						store.setState({ chooseState: 'done' })
					}
					refetch()
				}
			} catch (err) {
				const { response } = err as unknown as AxiosError<{ code: string; message: string }>
				if (response?.data.code === '3003') {
					setError('memoContent', { message: '한 조각만 선택 가능합니다.', type: 'validate' })
				}
			}
		},
		[userPieId, ownerEmail]
	)

	return chooseState === 'done' ? (
		<NotChoose owner={owner} />
	) : chooseState === 'choose' && choosed ? (
		<Choose owner={owner} feveDetail={choosed} />
	) : (
		<form className="flex flex-col w-full px-4" onSubmit={handleSubmit(onChoosePie)}>
			<div className="border-dashed border rounded-lg flex flex-col items-center space-y-4 py-3">
				{clickedState.item ? (
					<motion.div layoutId={`pie-clicked-${clickedState.item.id}`} className="flex flex-col space-y-2 items-center">
						<p
							style={{
								fontSize: '8px'
							}}
						>
							이걸로 할래요!
						</p>
						<div
							className="w-1/3"
							style={{
								maxWidth: clickedState.item.width + '%'
							}}
						>
							<img draggable={false} className="object-contain" src={clickedState.item.src} />
						</div>
					</motion.div>
				) : null}
				<h1 className="text-sm text-[#767676]">from. {nickname}</h1>
				<textarea
					{...rest}
					className="bg-transparent outline-none resize-none text-center"
					rows={8}
					ref={(e) => {
						ref(e)
						textRef.current = e
					}}
					onKeyDown={handleResizeHeight}
				/>
				<h1 className="text-xs font-bold text-mainTeal">최대 100자까지 입력가능</h1>
			</div>
			<ErrorMessage className="text-center text-red-300 mt-2" errors={errors} name="memoContent" as="h3" />
			<button
				type="submit"
				className="min-w-[100px] w-1/3 mx-auto rounded-full border border-solid border-black mt-2 text-white bg-mainTeal py-3"
			>
				보내기
			</button>
		</form>
	)
}

export default SendMessage
