interface UserDetail {
	bakingStatus: '01' | '02' | '03'
	pieId: '1' | '2' | '3'
	ownerEmail: string
	piecesNumber: number
	userPieId: string
	userPiePieces: any[]
}

export type { UserDetail }
