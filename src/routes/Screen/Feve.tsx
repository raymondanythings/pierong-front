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
		<div className="relative h-full overflow-y-scroll">
			<button
				style={{
					left: 'calc(var(--main-mr) + 16px)'
				}}
				onClick={() => navigate(-1)}
				className="fixed top-4 z-10 bg-mainTeal w-[120px] h-[50px] border border-solid border-black rounded-full flex items-center justify-center p-1"
			>
				<span className="w-full h-full text-white font-thin py-1 grow text-center rounded-full border border-solid border-white flex items-center justify-center">
					돌아가기
				</span>
			</button>

			<div className="absolute -z-[1]">
				<img src="/image/main_background.png" />
			</div>
			<div className="pt-20 space-y-16">
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
									<div key={item.feveId} className="w-16">
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
				<div className="w-[60px] h-[60px] border border-solid p-1 flex justify-center items-center">
					<div className="border-[#EAE6DA] grow h-full bg-mainTeal border border-solid   flex items-center justify-center text-[#EAE6DA] leading-5 flex-col">
						<svg
							width="25"
							height="25"
							viewBox="0 0 25 25"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
							xmlnsXlink="http://www.w3.org/1999/xlink"
						>
							<rect width="25" height="25" fill="url(#crown)" />
							<defs>
								<pattern id="crown" patternContentUnits="objectBoundingBox" width="1" height="1">
									<use xlinkHref="#crown_sm" transform="scale(0.0208333)" />
								</pattern>
								<image
									id="crown_sm"
									width="48"
									height="48"
									xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADZElEQVR4nO1ZzWsTQRQfrR9139uECmoFFbUKiiDowepBikcpfvwBgp4E8dIP0VPsyQpqFU+iggf1FNp9s7HWW9OevIh4qApJZ9IWW/UifraC2siktU2T3cxumpIN5gfvEnZ/7/ebee/tMGGsiiqqWBKkLNwtOL4SHAYSPWs2sUrCaG+4ThIkJce0CkH4cjzGDFYJSEdZjeDY90/8XBA+ZpUASdiVJ35uJ6CdBRnCglNu4jMGOP5JWcZRFkSkuLFPEP4oZGB2Fz4l7dAOFiQIGzZIjmM68Vkm3opoXZgFAS/uspWCYNCr+CwTPN3BlpdbPxOEt/2Kz5pMlxYtQHLskARfBGG/tLDJ9/uEo8UaEATPfeezsElpne23y2oFx3MmRdyPEUl4VnD87V88TqUIT/oSrrQt1DqpDPS7jDzPRpQQNSJ9ibfMQ8UKn9cIb5jkcEUzu+PqXKNNRPDAR+1HdHxJG/a4CZ8PuM8Emcc8JBzS7gKHI14NJKxQg45PEL7T8aTIPMMSUVwnCKd1D6szTqGEI3Z4m2cDfWx1Ia50lNV44Rl+Yu7MvCAJEnq34a2aFTvs1cBod3h7Ia6EFWrwwPMxnWbLZpJzfOihjC4WNgB3StUDkjCi4xAE1nxyC8/pk8JXYcNeR/HcbPYzSmdmuNnoKJ6bjR7PVO0LDmLeksNn9aKI1W4ZirJVqRjuEgTXJOEvz6ufbYIwospFcWXKhjDiRXympG3zYE7TwDe/IsoVguOkMp1TBrqZG5wQBIMOjQOd5RYmvQZBp1PzHK+cEjKb8wwM98D60m2xOqhBS6rXqB/pMTYKDq3qtxJxT49FQ2ud5y+HYQ8kT9U9jwrH24fMRw9a8kcttBXLJxcYgNeO4mf6AB/pCLIvqZJUu9nRQK9Rn8utdqJYPrnQwD1XA4LD+VIYUGKXyoC0jdOuBkZixn59A2GfSqRCED5zfgba8nfXuFAsn8yKgjca8ThbIQi+l6DRppQJteqZJiZol4Q/F8srCT+4is8qo4FFJ1qygG6tAUlwtfxC0aV8oVVvwMYTgTVghQ5oDVRRTqTirFZwvCUI3wev/nFCEt5UGl0NKPHlFip1QdjlbiCAKy/9fAsqwYAgHC/q76GghOB4vWATKxOZhgme8AnJ8YbuUqyKKv43/AVM/rp4B1oxuAAAAABJRU5ErkJggg=="
								/>
							</defs>
						</svg>
					</div>
				</div>
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
