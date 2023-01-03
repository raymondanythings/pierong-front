interface Response<T> {
	code: string
	data: T
	message: 'SUCCESS' | 'FAIL' | String
}
interface Feve {
	feveId: string
	feveName: string
	feveDescription: string
	feveImageUrl: string
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

interface CakePiece {
	cakePieceImageUrl: string
	memoContent: string
	pieceIndex: string
	userCakePieceId: string
}

export type { Response, FeveDetail, Feve }
