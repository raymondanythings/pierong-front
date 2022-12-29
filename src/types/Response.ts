interface Response<T> {
	code: string
	data: T
	message: 'SUCCESS' | 'FAIL' | String
}

export type { Response }
