import { UserApi } from 'api'
import CROWN from 'assets/crown'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import store from 'store'

const Feve = () => {
	const navigate = useNavigate()
	const { owner } = store((state) => ({ owner: state.owner, user: state.user }))

	useEffect(() => {
		if (!owner) {
			navigate('/')
		}
	}, [owner?.userId])

	return (
		<div className="relative">
			<button
				onClick={() => navigate(-1)}
				className="fixed top-2 left-2 z-10 bg-mainTeal w-28 border border-solid border-black rounded-full flex items-center justify-center"
			>
				<span className="m-1 text-white font-thin py-1 text-lg grow text-center rounded-full border border-solid border-white">
					돌아가기
				</span>
			</button>

			<div className="absolute -z-[1]">
				<img src="/image/main_background.png" />
			</div>
			<div className="py-16 space-y-16">
				<div className="bg-mainBeige w-full flex flex-col round-top border border-solid">
					<span className="py-2 text-center border-b border-solid">{owner?.nickname}'s CROWN</span>
					{owner ? (
						<div className="flex flex-col justify-center items-center space-y-4 py-4">
							<div className="w-2/5 relative -left-[2%]">
								<img src={CROWN[`CROWN_FORWARD_${owner.rank ?? 1}`]} />
							</div>
							<div className="flex justify-center items-center bg-mainTeal p-1 border border-solid">
								<div className="border-[#EAE6DA] border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5 py-1 px-6">
									<span className="text-xs font-light">왕관 LV.{owner.rank}</span>
								</div>
							</div>
						</div>
					) : null}
				</div>
				<div className="bg-mainBeige w-full flex flex-col round-top-s border border-solid">
					<span className="py-2 text-center border-b border-solid">{owner?.nickname}'s FEVE</span>
					{owner?.userFeve.length ? (
						<div className="grid grid-cols-3 feve-grid">
							{owner.userFeve.map((item, index) => (
								<div key={item.feveName + index} className=" flex justify-center grow py-3">
									<div key={item.feveId} className="w-10">
										<img src={`/image/feve/${item.feveId}.png`} className="drop-shadow-feve" />
									</div>
								</div>
							))}
						</div>
					) : (
						<div className="flex justify-center w-full py-4">
							<div>
								<h1>소유한 페브가 없습니다.</h1>
							</div>
						</div>
					)}
				</div>
			</div>
			<div
				className="fixed bottom-0 w-[180px] h-[60px] flex justify-center items-center bg-mainTeal p-2 z-30 border border-solid max-w-screen-default"
				style={{
					right: 'var(--main-mr)'
				}}
			>
				<div className="border-[#EAE6DA] border border-solid w-full h-full flex items-center justify-center text-[#EAE6DA] leading-5">
					<div className="relative">
						{owner?.nickname}
						<small
							className="ml-1"
							style={{
								fontSize: '0.75em'
							}}
						>
							의 베이킹룸
						</small>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Feve
