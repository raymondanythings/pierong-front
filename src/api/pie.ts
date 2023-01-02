import { axios } from 'api'
import { FeveDetail, Response } from 'types/Response'

interface CakePiece {
	pieceIndex: string
	userCakePieceId: string
}

interface UserCake {
	bakingStatus: '01' | '02' | '03'
	cakeId: string
	ownerEmail: string
	piecesNumber: number
	userCakeId: string
	userCakePiece: CakePiece[]
}

const getUserCake = async ({ userId }: { userId: string }) => {
	const res = await axios.get<Response<UserCake>>(`/cake/detail/${userId}`)
	return res.data.data
}

const createPie = async (pieType: number = 1) => {
	const res = await axios.post<Response<any>>(`/cake/bake`, {
		cakeId: pieType
	})
	if (res.data.message !== 'SUCCESS') {
		return false
	}
	return true
}

interface SendMessage {
	userCakeId: string
	ownerEmail: string
	pieceIndex: number
	memoContent: string
}

const choosePie = async (param: SendMessage) => {
	// try {
	const res = await axios.post<Response<FeveDetail>>('/cake/piece/choose', param)
	return res.data
	// } catch (err: any) {
	// const { response } = err as unknown as AxiosError<{ code: string; message: string }>
	// 	return response?.data
	// }
}

export { getUserCake, createPie, choosePie }
