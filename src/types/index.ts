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
	key?: unknown | string
	message?: string
	btnText?: string
	btnHide?: boolean
	payload?: {
		confirm?: (data?: any) => any | void
		cancel?: (data?: any) => any | void
	}
}

type CrownRank = '1' | '2' | '3' | '4' | '5'

interface UserFeve {
	collectedDate: string
	feveDescription: string
	feveId: string
	feveImageUrl: string
	feveName: string
}

interface UserDetail {
	email: string
	nickname: string
	rank: CrownRank
	crownId: CrownRank
	crownName: string
	crownDescription: string
	crownImageUrl: string
	userFeve: UserFeve[]
}
interface Pie {
	id: number
	src: string
	width: number
	top: number
	left: number
	z?: number
}

interface UserPieFeve {
	collectedDate: string
	feveDescription: string
	feveId: string
	faveImageUrl: string
	feveName: string
	nickname: string
	selectedBy: string
	selectedDate: string
}

export type { Tokens, User, PopupType, UserDetail, Pie, CrownRank, UserPieFeve }
