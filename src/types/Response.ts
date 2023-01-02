interface Response<T> {
	code: string
	data: T
	message: 'SUCCESS' | 'FAIL' | String
}

interface FeveDetail {
	feveDescription: string
	feveId: string
	feveImageUrl: string
	feveIndex: string
	feveName: string
	ownerEmail: string
	userCakeFeveId: string
	userCakeId: string
}

export type { Response, FeveDetail }
