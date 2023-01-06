import { PieApi, UserApi } from 'api'
import CROWN from 'assets/crown'
import { formatDate, numberToKr } from 'libs/utils'
import React from 'react'
import { QueryCache, useQuery } from 'react-query'
import store from 'store'

const CompletePie = () => {
	const {
		userId = '',
		setPopup,
		setOwner
	} = store((state) => ({ userId: state.owner?.userId, setPopup: state.setPopup, setOwner: state.setOwner }))
	const { data: pieData, refetch: pieRefetch } = useQuery(['room', 'pie', userId], () => PieApi.getUserPie({ userId }), {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
		retry: false,
		refetchOnWindowFocus: false,
		enabled: !!userId
	})

	const { data: { data: userData = null } = {}, refetch: userRefetch } = useQuery(
		['room', 'user', userId],
		() => UserApi.getUserDetail(userId),
		{
			cacheTime: Infinity,
			staleTime: 1000 * 60 * 5,
			retry: false,
			refetchOnWindowFocus: false,
			enabled: !!userId,
			onSuccess({ data }) {
				setOwner({ ...data, userId })
			}
		}
	)
	const onSelectFeve = () => {
		setPopup({
			key: 'selectFeve',
			isOpen: true,
			btnHide: true
		})
	}

	return (
		<div>
			<div className="p-4 flex flex-col space-y-4">
				<div className="flex flex-col space-y-2">
					<h1 className="text-center text-base">
						축하합니다! <span className="text-mainTeal">{userData?.nickname}님</span>의<br />
						<span className="text-mainTeal">{numberToKr[+userData?.crownId! ?? 0]} 파이</span>가 모두 소진 되었어요!
					</h1>
					<p className="text-center text-graytext font-thin text-[8px]">(내가얻은 업적들은 메뉴바 MY창에서 확인가능해요!)</p>
				</div>
				<div className="shadow-btn text-mainTeal py-1">왕관 업그레이드</div>
				<div className="flex justify-between gap-x-2 border border-dashed rounded-lg p-4 aspect-[3/1]">
					<div className="flex-1 flex items-center">
						<img className="flex-1 mx-auto" src={CROWN[`CROWN_FORWARD_${userData?.rank ?? 1}`]} />
					</div>
					<div className="relative flex flex-col justify-center items-center flex-1 space-y-2">
						<span className="text-sm">왕관레벨 LV.{userData?.rank}</span>

						<span className="text-xs text-mainTeal absolute -bottom-1 left-1/2 -translate-x-1/2">
							{formatDate(new Date().toDateString())}
						</span>
					</div>
				</div>
				<div className="shadow-btn text-mainTeal py-1">얻은 페브</div>
				<div className="flex justify-between gap-x-2 border border-dashed rounded-lg p-4">
					<div className="flex-1">
						<img className="mx-auto max-w-[70%]" src={`/image/feve/${pieData?.userPieFeve?.feveId}.png`} />
					</div>
					<div className="relative flex flex-col justify-center items-center flex-1">
						<span className="text-sm font-bold">{pieData?.userPieFeve?.feveName}</span>

						<span className="text-xs text-mainTeal absolute bottom-0 left-1/2 -translate-x-1/2">
							{formatDate(pieData?.userPieFeve?.collectedDate || new Date().toDateString())}
						</span>
					</div>
				</div>
				<div className="shadow-btn text-mainTeal py-1">받은 메세지</div>
				{pieData?.userPiePiece.map((piece) => (
					<div key={piece.pieceIndex} className="flex flex-col items-center dashed-box w-full p-4 space-y-6">
						<h3 className="text-graytext text-xs">from. {piece.nickname}</h3>
						<p className="break-all text-center">{piece.memoContent}</p>
						<span className="text-mainTeal text-xs">{piece.selectedBy}</span>
					</div>
				))}
				<div className="sticky bottom-0 flex justify-center">
					<button onClick={onSelectFeve} className="modal-btn">
						새 파이 굽기
					</button>
				</div>
			</div>
		</div>
	)
}

export default CompletePie
