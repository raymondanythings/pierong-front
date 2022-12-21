import { Tokens } from 'libs/type'
import create from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'api'
interface IStore {
	user: null | object
	atk: string | null
	rtk: string | null
	isLogin: boolean
	setUser: (user: any) => void
	setNav: () => void
	showNav: boolean
	setTokens: (tokens: Tokens) => void
}

const store = create(
	devtools(
		subscribeWithSelector(
			immer<IStore>((set) => ({
				user: null,
				isLogin: false,
				showNav: false,
				atk: null,
				rtk: null,
				setUser: (user) => set({ user: user }),
				setNav: () =>
					set((state) => ({
						showNav: !state.showNav
					})),
				setTokens: ({ atk, rtk }: Tokens) =>
					set((state) => ({
						atk: atk || state.atk,
						rtk: rtk || state.rtk
					}))
			}))
		)
	)
)

store.subscribe(
	({ atk, rtk }) => ({ atk, rtk }),
	({ atk }) => {
		if (atk) {
			axios.defaults.headers['X-ACCESS-TOKEN'] = atk
		} else {
			axios.defaults.headers['X-ACCESS-TOKEN'] = ''
		}
	},
	{ fireImmediately: true }
)
export const useCommonStore = store.getState()

export default store
