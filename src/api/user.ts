import { axios } from 'api'
import { NickNameChange } from 'components/Modal/NickNameChangePopup'
import { UserDetail } from 'types'
import { Response } from 'types/Response'

const getUserDetail = async (email: string) => {
	const res = await axios.get<Response<UserDetail>>(`/user/detail/${email}`)
	return res.data
}

const postChangeNickName = async (nickname: NickNameChange) => {
	const res = await axios.post<Response<any>>('/user/nickname/change', nickname)
	return res.data
}

export { getUserDetail, postChangeNickName }
