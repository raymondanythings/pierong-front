import create, { UseBoundStore } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { axios } from 'api'
import { Tokens, User } from 'types'

interface IStore<T = any> {
	user?: null | User
	atk: string | null
	rtk: string | null
	isLogin: boolean
	errorMessage?: string
	setErrorMessage: (message: string) => void
	setUser: (user: User) => void
	setNav: () => void
	showNav: boolean
	setTokens: (tokens: Tokens) => void
	dragState: {
		state: boolean
		dragged: T
	}
	setIsDragging: (flag: { state: boolean; dragged: T }) => void
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
				errorMessage: undefined,
				setErrorMessage: (msg) => set((state) => ({ ...state, errorMessage: msg })),
				setUser: (user) => set((state) => ({ ...state, user: user })),
				setNav: () =>
					set((state) => ({
						showNav: !state.showNav
					})),
				setTokens: ({ atk, rtk }: Tokens) => {
					return set((state) => ({
						atk: atk || state.atk,
						rtk: rtk || state.rtk
					}))
				},
				dragState: {
					state: false,
					dragged: null
				},
				setIsDragging: ({ state, dragged }) =>
					set({
						dragState: {
							state,
							dragged
						}
					})
			}))
		)
	)
)

store.subscribe(
	({ atk, rtk }) => ({ atk, rtk }),
	({ atk, rtk }) => {
		if (atk) {
			localStorage.setItem('X-ACCESS-TOKEN', atk)
			axios.defaults.headers['X-ACCESS-TOKEN'] = atk
		} else {
			delete axios.defaults.headers['X-ACCESS-TOKEN']
		}
		rtk && localStorage.setItem('X-REFRESH-TOKEN', rtk)
	},
	{
		equalityFn(a, b) {
			return a.atk === b.atk || a.rtk === b.rtk
		}
	}
)
export const useCommonStore = store.getState()

export default store
