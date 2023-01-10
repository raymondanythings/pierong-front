import { UserApi } from 'api'
import CROWN from 'assets/crown'
import { urlSafebtoa } from 'libs/utils'
import { useEffect } from 'react'
import { useQuery } from 'react-query'
import { useNavigate } from 'react-router-dom'
import store from 'store'

const Feve = () => {
	const navigate = useNavigate()
	const { user } = store((state) => ({ owner: state.owner, user: state.user }))
	const {
		data: { data: owner = null } = {},
		isLoading: isUserLoading,
		refetch: userRefetch
	} = useQuery(['room', 'user', urlSafebtoa(user?.email ?? '')], () => UserApi.getUserDetail(urlSafebtoa(user?.email ?? '')), {
		cacheTime: Infinity,
		staleTime: 1000 * 60 * 5,
		retry: false,
		refetchOnWindowFocus: false,
		enabled: !!user?.email
	})

	useEffect(() => {
		if (!isUserLoading && !owner) {
			navigate('/')
		}
	}, [isUserLoading])

	return (
		<div className="relative">
			<button
				style={{
					left: 'calc(var(--main-mr) + 16px)'
				}}
				onClick={() => navigate(-1)}
				className="fixed top-4 left-4 z-10 bg-mainTeal w-24 border border-solid border-black rounded-full flex items-center justify-center"
			>
				<span className="m-1 text-white font-thin py-1 text-sm grow text-center rounded-full border border-solid border-white">
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
				className={`fixed bottom-0 h-[60px] flex justify-center items-center z-30  max-w-screen-default bg-mainTeal`}
				style={{
					right: 'var(--main-mr)'
				}}
			>
				<div className="h-[60px] border border-solid p-1 flex justify-center items-center relative">
					<div className="border-[#EAE6DA] grow h-full bg-mainTeal border border-solid   flex items-center justify-center text-[#EAE6DA] leading-5 space-x-2 px-2">
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
