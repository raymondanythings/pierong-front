import { axios } from 'api'
import { Response } from 'types/Response'

const getUserCake = async ({ userId }: { userId: string }) => {
	const res = await axios.get<Response<any>>(`/cake/user/${userId}`)
	if (res.data.message !== 'SUCCESS') {
		res.data.data.messege = 'Something wrong'
	}
	return res.data.data
}

const createPie = async (pieType: number = 1) => {
	const res = await axios.post<Response<any>>(`/cake/bake`, {
		cakeId: pieType
	})
	if (res.data.message === 'SUCCESS') {
		return false
	}
	return true
}

export { getUserCake, createPie }
