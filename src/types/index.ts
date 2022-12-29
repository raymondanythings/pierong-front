export type oauthService = 'google' | 'kakao' | 'naver'

type User = {
	email: string
	modifiedDate?: string
	nickname: string
	userInfoSeq: number
	createdDate?: string
	deleteYn?: string
	deletedDate?: string
	socialType: 'kakao' | 'google' | 'naver'
	userSocialSeq: string
	userSocialUniqueId: string
}
type Tokens = {
	atk?: string | null
	rtk?: string | null
}

interface PopupType {
	isOpen?: boolean
	message?: string
	btnText?: string
	payload?: {
		confirm?: (data?: any) => any | void
		cancel?: (data?: any) => any | void
	}
}

export type { Tokens, User, PopupType }
