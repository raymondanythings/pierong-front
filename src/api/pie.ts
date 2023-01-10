import { axios } from 'api'
import { Feve, FeveDetail, Response, UserPie } from 'types/Response'

const getUserPie = async ({ userId }: { userId: string }) => {
	const res = await axios.get<Response<UserPie>>(`/pie/detail/${userId}`)
	return res.data.data
}

const createPie = async (feveId: string, pieType: number = 2) => {
	const res = await axios.post<Response<any>>(`/pie/bake`, {
		pieId: pieType,
		feveId
	})
	if (res.data.message !== 'SUCCESS') {
		return false
	}
	return true
}

interface SendMessage {
	userPieId: string
	ownerEmail: string
	pieceIndex: number
	memoContent: string
}

const choosePie = async (param: SendMessage) => {
	// try {
	const res = await axios.post<Response<FeveDetail>>('/pie/piece/choose', param)
	return res.data
	// } catch (err: any) {
	// const { response } = err as unknown as AxiosError<{ code: string; message: string }>
	// 	return response?.data
	// }
}

const getFeveList = async () => {
	const res = await axios.get<Response<Feve[]>>('pie/feve')
	return res.data
}

const checkAlreadySend = async (param: Partial<UserPie>) => {
	const res = await axios.post<Response<boolean>>('/pie/piece/available', param)
	return res.data.data
}

export { getUserPie, createPie, choosePie, getFeveList, checkAlreadySend }
