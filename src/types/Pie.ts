interface UserDetail {
	bakingStatus: '01' | '02' | '03'
	cakeId: '1' | '2' | '3'
	ownerEmail: string
	piecesNumber: number
	userCakeId: string
	userCakePieces: any[]
}

export type { UserDetail }
