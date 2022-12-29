import { UserApi } from 'api'
import React from 'react'
import { useForm } from 'react-hook-form'
import store from 'store'

export interface NickNameChange {
	nickname: string
}

const NickNameChangePopup = ({ refetch }: { refetch?: (data?: any) => void }) => {
	const [user, setUser] = store((state) => [state.user, state.setUser])
	const popup = store((state) => state.popup)
	const { handleSubmit, register } = useForm<NickNameChange>({
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
		popup?.payload?.cancel && popup?.payload?.cancel()
	}
	return (
		<form onSubmit={handleSubmit(onValid)} className="flex flex-col items-center space-y-4">
			<h3 className="text-lg font-bold">닉네임 변경</h3>
			<div className="flex justify-center items-center bg-mainTeal p-2 z-30 border border-solid w-[200px] h-[60px]">
				<div className="border-[#EAE6DA] border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5 ">
					<input
						className="bg-transparent outline-none text-center underline underline-offset-4 px-2"
						{...register('nickname', {
							maxLength: {
								value: 10,
								message: '최대 10글자 까지 가능합니다.'
							},
							minLength: {
								value: 2,
								message: '2글자 이상 입력해주세요.'
							}
						})}
					/>
				</div>
			</div>
			<h4 className="text-lg font-bold">의 베이킹룸</h4>
			<button className="min-w-[100px] rounded-full border border-solid border-black mt-2 text-white bg-mainTeal py-3">변경</button>
		</form>
	)
}

export default NickNameChangePopup
