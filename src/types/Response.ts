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
	userPieFeveId: string
	userPieId: string
}

interface PiePiece {
	pieceIndex: string
	userPiePieceId: string
	piePieceImageUrl: string
	memoContent: string
	selectedBy: string
	nickname: string
	selectedDate: string
}

interface UserPie {
	bakingStatus: '01' | '02' | '03'
	pieId: string
	ownerEmail: string
	piecesNumber: number
	userPieId: string
	userPiePiece: PiePiece[]
	createdDate?: string
	completedDate?: string
}

export type { Response, FeveDetail, Feve, PiePiece, UserPie }
