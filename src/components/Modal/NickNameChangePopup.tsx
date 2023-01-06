import { ErrorMessage } from '@hookform/error-message'
import { UserApi } from 'api'
import React from 'react'
import { useForm } from 'react-hook-form'
import store from 'store'

export interface NickNameChange {
	nickname: string
}

const NickNameChangePopup = ({ refetch, title = '닉네임 변경' }: { refetch?: (data?: any) => void; title?: string }) => {
	const [user, setUser, refreshPopup] = store((state) => [state.user, state.setUser, state.refreshPopup])
	const popup = store((state) => state.popup)
	const {
		handleSubmit,
		register,
		formState: { errors }
	} = useForm<NickNameChange>({
		defaultValues: {
			nickname: user?.nickname
		}
	})

	const onValid = async (data: NickNameChange) => {
		const res = await UserApi.postChangeNickName(data)
		if (user) {
			setUser({ ...user, nickname: data.nickname || '' })
		}
		refetch && refetch(data.nickname)
		popup && !popup?.cancelDisabled && popup?.payload?.cancel ? popup?.payload?.cancel() : refreshPopup()
	}
	return (
		<form onSubmit={handleSubmit(onValid)} className="flex flex-col items-center space-y-4">
			<h3 className="text-lg font-bold">{title}</h3>
			<div className="flex justify-center items-center bg-mainTeal p-2 z-30 border border-solid w-[200px] h-[60px]">
				<div className="border-[#EAE6DA] border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5 ">
					<input
						className="bg-transparent outline-none text-center underline underline-offset-4 px-2"
						{...register('nickname', {
							required: '2글자 이상 입력해주세요.',
							maxLength: {
								value: 7,
								message: '최대 7글자 까지 가능합니다.'
							},
							minLength: {
								value: 2,
								message: '2글자 이상 입력해주세요.'
							},
							pattern: {
								value: /^[가-힣|a-z|A-Z|0-9|]+$/g,
								message: '숫자 또는 문자만 입력 가능합니다.'
							}
						})}
					/>
				</div>
			</div>
			<h4 className="text-lg font-bold">의 베이킹룸</h4>
			<ErrorMessage errors={errors} name="nickname" as="h3" className="text-red-400" />
			<button className="min-w-[100px] rounded-full border border-solid border-black mt-2 text-white bg-mainTeal py-3">변경</button>
		</form>
	)
}

export default NickNameChangePopup
