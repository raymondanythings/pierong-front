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
	userPieFeveId: string
	userPieId: string
}

interface PiePiece {
	piePieceImageUrl: string
	memoContent: string
	pieceIndex: string
	userPiePieceId: string
}

export type { Response, FeveDetail, Feve, PiePiece }
