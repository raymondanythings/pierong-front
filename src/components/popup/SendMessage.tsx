import { PieApi } from 'api'
import { FC, KeyboardEvent, useCallback, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import store from 'store'
import { ErrorMessage } from '@hookform/error-message'

interface MessageForm {
	memoContent: string
}

interface SendMessageProps {
	userCakeId?: string
	ownerEmail?: string
	refetch: () => void
}

const SendMessage: FC<SendMessageProps> = ({ refetch, ownerEmail, userCakeId }) => {
	const [isDone, setIsDone] = useState(false)
	const { nickname, refreshPopup, setDragState, dragState } = store((state) => ({
		nickname: state.user?.nickname,
		setDragState: state.setDragState,
		dragState: state.dragState,
		refreshPopup: state.refreshPopup,
		setPopup: state.setPopup
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
		}
	})

	const onChoosePie = useCallback(
		async (data: MessageForm) => {
			if (!ownerEmail || !userCakeId) {
				setDragState({
					state: 'idle',
					dragged: null,
					item: null
				})
				refreshPopup()
				return
			}
			const res = await PieApi.choosePie({
				ownerEmail,
				userCakeId,
				memoContent: data.memoContent,
				pieceIndex: dragState.dragged.id
			})
			// 당첨자 응답값 {"data":{"feveId":"2","feveName":"연꽃페브","feveDescription":"연꽃페브","feveImageUrl":"/image/feve/example2.png","userCakeFeveId":"14","userCakeId":"36","feveIndex":"4","ownerEmail":"neung.gwon@gmail.com"},"code":"0000","message":"SUCCESS"}
			/**
			 * 타인이 조각 선택 시 feve 당첨여부 조회 == choose한 시점
					각자 feve를 소유하는 시점 == baking_status가 02가 되는 시점
			 */
			if (res?.code === '3003') {
				setError('memoContent', { message: '파이당 한 조각만 선택 가능합니다.', type: 'validate' })
			} else if (res?.code === '0000') {
				setIsDone(true)
				refetch()
			}
		},
		[userCakeId, ownerEmail]
	)
	return !isDone ? (
		<form className="flex flex-col w-full px-4" onSubmit={handleSubmit(onChoosePie)}>
			<div className="border-dashed border rounded-lg flex flex-col items-center space-y-4 py-3">
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
	) : (
		<div>
			<h1>선택이 완료되었습니다.</h1>
			<button
				onClick={() => {
					setDragState({
						state: 'idle',
						dragged: null,
						item: null
					})
					refreshPopup()
				}}
				className="min-w-[100px] w-1/3 mx-auto rounded-full border border-solid border-black mt-2 text-white bg-mainTeal py-3"
			>
				확인
			</button>
		</div>
	)
}

export default SendMessage
