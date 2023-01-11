import { urlSafebtoa } from 'libs/utils'
import { useCallback, useLayoutEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import store from 'store'

interface LocalHistory {
	nickname: string
	userId: string
	date: number
}

const VisitHistory = () => {
	const { user, refreshPopup } = store((state) => ({ user: state.user, refreshPopup: state.refreshPopup }))
	const [history, setHistory] = useState<LocalHistory[] | []>([])
	const [clickedHistory, setClickedHistory] = useState<LocalHistory | null>(null)
	const navigate = useNavigate()

	const onVisit = useCallback((url: string) => {
		setHistory([])
		setClickedHistory(null)
		refreshPopup()
		navigate(`/room/${url}`)
	}, [])

	useLayoutEffect(() => {
		const email = user?.email ?? ''
		const localHistory: LocalHistory[] | [] = JSON.parse(localStorage.getItem(`ROOM_HISTORY_${urlSafebtoa(email)}`) ?? '[]') || []

		setHistory(localHistory)
	}, [])

	return (
		<div className="w-full px-7 flex flex-col space-y-6">
			{history.length ? (
				<>
					<h1 className="text-center">
						<b className="text-mainTeal">최근방문</b> 친구 방가기
					</h1>
					<div className="w-full flex flex-col space-y-4 items-center">
						{history.map((item) => (
							<div key={item.userId} className="shadow-btn h-12 justify-between items-center">
								<span className="pl-7">
									<b className="text-mainTeal">{item.nickname}</b>의 베이킹룸
								</span>

								<div
									onClick={() => setClickedHistory(item)}
									className="flex border-l-mainTeal border-solid border-l p-2 h-full aspect-square"
								>
									<img className="w-[30px] h-[30px]" src="/image/icon/door_g.png" alt="door" />
								</div>
							</div>
						))}
					</div>
				</>
			) : (
				<h1 className="text-center">
					<b className="text-mainTeal">최근방문</b> 내역이 없어요.
				</h1>
			)}
			<div className="w-fit mx-auto p-2 text-xs font-thin rounded-full border border-solid border-black mt-2 text-white bg-mainTeal ">
				{new Intl.DateTimeFormat('ko').format(new Date())} 기준
			</div>
			{clickedHistory ? (
				<div
					className="fixed top-0 w-screen h-screen z-[100] flex justify-center items-center max-w-screen-default left-[50%] -translate-x-[50%]"
					style={{
						marginTop: 0
					}}
				>
					<div className="absolute w-full h-full" onClick={() => setClickedHistory(null)} />
					<div
						className={`w-4/5 min-h-[150px] rounded-2xl bg-mainTeal p-2 flex justify-center items-stretch border-black border border-solid relative`}
					>
						<div className="top-icon z-30">
							<div className="bg-mainBeige border-black border border-solid flex justify-center items-center grow rounded-full">
								<img src={`/image/icon/logo.png`} className="w-3/4 max-w-[23px] max-h-[23px]" />
							</div>
						</div>

						<div className="grow flex flex-col justify-center items-center bg-mainBeige border-black border border-solid py-5 overflow-y-scroll max-h-[calc(var(--vh,1vh)_*_80)] rounded-2xl relative">
							<h1 className="text-center leading-5 py-3">
								<b className="text-mainTeal">{clickedHistory.nickname}</b>의 베이킹룸에
								<br />
								방문 할까요?
							</h1>
							<div className="flex space-x-2">
								<button
									onClick={() => onVisit(clickedHistory.userId)}
									className="modal-btn py-1.5 text-sm font-normal min-w-min px-6"
								>
									네
								</button>
								<button
									onClick={() => setClickedHistory(null)}
									className="modal-btn py-1.5 text-sm font-normal bg-transparent text-black min-w-min px-6"
								>
									아니요
								</button>
							</div>
						</div>
					</div>
				</div>
			) : null}
		</div>
	)
}

export default VisitHistory
