import { axios } from 'api'
import { NickNameChange } from 'components/Modal/NickNameChangePopup'
import { UserDetail, UserPieFeve } from 'types'
import { PiePiece, Response, UserPie } from 'types/Response'

const getUserDetail = async (email: string) => {
	const res = await axios.get<Response<UserDetail>>(`/user/detail/${email}`)
	return res.data
}

const postChangeNickName = async (nickname: NickNameChange) => {
	const res = await axios.post<Response<any>>('/user/nickname/change', nickname)
	return res.data
}

export interface UserHistory extends UserPie {
	userPieFeve: UserPieFeve
	userPiePiece: PiePiece[]
}

const getOwnerDetail = async (userId: string) => {
	const res = await axios.get<Response<UserHistory[] | []>>(`/user/ownerDetail/${userId}`)
	return res.data
}

const getWithdraw = async () => {
	const res = await axios.get<Response<null>>('/user/withdraw')
	return res.data
}

export { getUserDetail, postChangeNickName, getOwnerDetail, getWithdraw }
