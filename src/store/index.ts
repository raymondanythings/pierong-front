import create from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'api'
import { Tokens, User } from 'types'

interface IStore {
	user?: null | User
	atk: string | null
	rtk: string | null
	isLogin: boolean
	setIsLogin: (flag: boolean) => void
	errorMessage?: string
	setErrorMessage: (message: string) => void
	setUser: (user: User) => void
	setNav: () => void
	showNav: boolean
	setTokens: (tokens: Tokens) => void
	isDragging: boolean
	setIsDragging: (flag: boolean) => void
}

const store = create(
	devtools(
		subscribeWithSelector(
			immer<IStore>((set) => ({
				user: null,
				isLogin: false,
				setIsLogin: (flag) => set((state) => ({ ...state, isLogin: flag })),
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
				setTokens: ({ atk, rtk }: Tokens) =>
					set((state) => ({
						atk: atk || state.atk,
						rtk: rtk || state.rtk
					})),
				isDragging: false,
				setIsDragging: (flag) =>
					set({
						isDragging: flag
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
			localStorage.removeItem('X-ACCESS-TOKEN')
		}
		rtk && localStorage.setItem('X-REFRESH-TOKEN', rtk)
	},
	{ fireImmediately: true }
)

store.subscribe(
	({ user, setIsLogin }) => ({ user, setIsLogin }),
	({ user, setIsLogin }) => setIsLogin(!!user)
)

export const useCommonStore = store.getState()

export default store
