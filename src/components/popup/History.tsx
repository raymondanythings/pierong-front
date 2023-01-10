import { UserApi } from 'api'
import { UserHistory } from 'api/user'
import Loading from 'components/animation/Loading'
import useCopyClipboard from 'hooks/useCopyClipboard'
import { formatDate, formatOrdianl, numberToKr, urlSafebtoa } from 'libs/utils'
import { useCallback, useLayoutEffect, useMemo, useState } from 'react'
import { useQuery } from 'react-query'
import store from 'store'

const Lock = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<g style={{ mixBlendMode: 'overlay' }}>
			<rect width="20" height="20" fill="url(#pattern10)" />
		</g>
		<defs>
			<pattern id="pattern10" patternContentUnits="objectBoundingBox" width="1" height="1">
				<use xlinkHref="#image0_577_1609" transform="scale(0.00195312)" />
			</pattern>
			<image
				id="image0_577_1609"
				width="512"
				height="512"
				xlinkHref="data:image/png;base64,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"
			/>
		</defs>
	</svg>
)

const UnLock = () => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<g style={{ mixBlendMode: 'overlay' }}>
			<rect width="20" height="20" fill="url(#pattern11)" />
		</g>
		<defs>
			<pattern id="pattern11" patternContentUnits="objectBoundingBox" width="1" height="1">
				<use xlinkHref="#image11_538_1601" transform="scale(0.00195312)" />
			</pattern>
			<image
				id="image11_538_1601"
				width="512"
				height="512"
				xlinkHref="data:image/png;base64,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"
			/>
		</defs>
	</svg>
)

const BigLock = () => (
	<svg
		width="80"
		height="80"
		viewBox="0 0 80 80"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		xmlnsXlink="http://www.w3.org/1999/xlink"
	>
		<g style={{ mixBlendMode: 'overlay' }}>
			<rect width="80" height="80" fill="url(#pattern9)" />
		</g>
		<defs>
			<pattern id="pattern9" patternContentUnits="objectBoundingBox" width="1" height="1">
				<use xlinkHref="#image9_577_1636" transform="scale(0.00195312)" />
			</pattern>
			<image
				id="image9_577_1636"
				width="512"
				height="512"
				xlinkHref="data:image/png;base64,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"
			/>
		</defs>
	</svg>
)

interface SelectedHistory {
	selectedIndex: number
	item: UserHistory
}
const locks = [0, 1, 2, 3, 4]

const History = () => {
	const { user } = store((state) => ({ userNickname: state.user?.nickname, ownerDetail: state.owner, user: state.user }))
	const [selectedHistory, setSelectedHistory] = useState<SelectedHistory | null>(null)
	const {
		data: { data: owner = [] } = {},
		refetch,
		isLoading
	} = useQuery(['room', 'user', 'owner', urlSafebtoa(user?.email ?? '')], () => UserApi.getOwnerDetail(urlSafebtoa(user?.email ?? '')), {
		cacheTime: Infinity,
		staleTime: 1000 * 60,
		retry: false,
		refetchOnWindowFocus: false,
		enabled: !!user?.email
	})

	const { copyUrlOnClipboard } = useCopyClipboard()
	const openedLockIndex = useMemo(() => owner.length, [owner.length])

	useLayoutEffect(() => {
		refetch()

		if (owner.length) {
			setSelectedHistory({ selectedIndex: 0, item: owner[0] })
		}
	}, [owner])
	return !isLoading ? (
		<div className="grow flex flex-col rounded-b-2xl w-full">
			<nav className="w-full grid grid-cols-5">
				{locks.map((lock, index) => (
					<div
						onClick={() => {
							if (index >= openedLockIndex || selectedHistory?.selectedIndex === index) {
								return
							}
							setSelectedHistory({
								selectedIndex: index,
								item: owner[index]
							})
						}}
						key={lock}
						className={`grow rounded-t-xl flex justify-center items-center h-10 border border-solid text-mainTeal ${
							lock === 4 ? '' : 'border-r-0'
						} ${index < openedLockIndex ? 'bg-[#EAE6DA]' : 'bg-grayBg'}`}
					>
						{index < openedLockIndex ? <UnLock /> : <Lock />}
					</div>
				))}
			</nav>
			<div className="bg-mainBeige grow py-4 px-5 max-h-half overflow-y-scroll rounded-b-lg">
				{selectedHistory ? (
					<h1 className="text-mainTeal text-lg text-center mb-4">
						{user?.nickname}의 {formatOrdianl(selectedHistory.selectedIndex + 1)} 파이
					</h1>
				) : null}
				{owner.length && selectedHistory ? (
					<div className="flex flex-col space-y-6">
						{selectedHistory.item.userPieFeve ? (
							<>
								<div className="shadow-btn text-mainTeal py-1">얻은 페브</div>
								<div className="flex justify-between gap-x-2 border border-dashed rounded-lg p-4">
									<div className="flex-1">
										<img
											className="mx-auto max-w-[70%]"
											src={`/image/feve/${selectedHistory.item.userPieFeve.feveId}.png`}
										/>
									</div>
									<div className="relative flex flex-col justify-center items-center flex-1">
										<span className="text-sm font-bold">{selectedHistory.item.userPieFeve.feveName}</span>
										{selectedHistory.item.userPieFeve.collectedDate ? (
											<span className="text-xs text-mainTeal absolute bottom-0 left-1/2 -translate-x-1/2">
												{formatDate(selectedHistory.item.userPieFeve.collectedDate)}
											</span>
										) : null}
									</div>
								</div>
							</>
						) : null}
						{selectedHistory.item.userPiePiece ? (
							<>
								<div className="shadow-btn text-mainTeal py-1">받은 메세지</div>

								{selectedHistory.item.userPiePiece.map((piece) => (
									<div key={piece.pieceIndex} className="flex flex-col items-center dashed-box w-full p-4 space-y-6">
										<h3 className="text-graytext text-xs">from. {piece.nickname}</h3>
										<p className="break-all text-center">{piece.memoContent}</p>
										<span className="text-mainTeal text-xs">{formatDate(piece.selectedDate)}</span>
									</div>
								))}
							</>
						) : null}
					</div>
				) : (
					<div className="w-full py-4 flex flex-col justify-center items-center space-y-6">
						<BigLock />
						<p className="text-center leading-6 font-bold">
							파이를 모두 소비하면
							<br /> 받은 메세지와 페브를 확인 할 수 있어요.
							<br />
							친구들에게 어서 공유해보세요!
						</p>
						<button onClick={copyUrlOnClipboard} className="modal-btn">
							공유하기
						</button>
					</div>
				)}
			</div>
		</div>
	) : null
}

export default History
