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
	key?: string
	message?: string
	btnText?: string
	btnHide?: boolean
	payload?: {
		confirm?: (data?: any) => any | void
		cancel?: (data?: any) => any | void
	}
}

interface UserDetail {
	email: string
	nickname?: string
	rank: string
	crownId: string
	crownName: string
	crownDescription: string
	crownImageUrl: string
	userFeve: any[]
}

export type { Tokens, User, PopupType, UserDetail }
