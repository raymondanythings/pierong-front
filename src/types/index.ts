export type oauthService = 'google' | 'kakao' | 'naver'

export interface User {
	email: string
	modifiedDate?: string
	nickname: string
	userInfoSeq: number
}
