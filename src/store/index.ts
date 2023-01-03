import create from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { axios } from 'api'
import { PopupType, Tokens, User } from 'types'

type DragState = 'idle' | 'dragging' | 'pending' | 'complete'
interface PopupTypeArgs extends PopupType {
	cancelDisabled?: boolean
}
interface IStore<T = any, S = any> {
	user?: null | User
	atk: string | null
	rtk: string | null
	isLogin: boolean
	isMainChange: boolean
	userId?: string | null
	setUserId: (userId: string) => void
	chooseState?: string | null
	setIsMainChange: (flag: boolean) => void
	setIsLogin: (flag: boolean) => void
	popup?: PopupTypeArgs
	setPopup: (payload: PopupTypeArgs) => void
	setUser: (user: User) => void
	setNav: () => void
	showNav: boolean
	setTokens: (tokens: Tokens) => void
	dragState: {
		enter: boolean
		state: DragState
		item: T
		dragged: S
	}
	isMobile: boolean
	setDragState: (flag: { enter?: boolean; state?: DragState; dragged?: T; item?: T }) => void
	refreshAccount: () => void
	refreshPopup: () => void
}

const store = create(
	devtools(
		subscribeWithSelector(
			immer<IStore>((set, get) => ({
				user: null,
				isLogin: false,
				isMainChange: false,
				isMobile: false,
				setIsMainChange: (flag) => set({ isMainChange: flag }),
				setIsLogin: (flag) => set((state) => ({ ...state, isLogin: flag })),
				showNav: false,
				atk: null,
				rtk: null,
				userId: null,
				setUserId: (userId) => set({ userId }),
				popup: undefined,
				chooseState: null,
				setPopup: ({ btnText = '확인', payload = {}, ...rest }) =>
					set((state) => {
						if (!rest.cancelDisabled && !payload.cancel) {
							payload.cancel = state.refreshPopup
						}
						if (!rest.cancelDisabled && !payload.confirm) {
							payload.confirm = state.refreshPopup
						}
						return {
							popup: {
								...state.popup,
								btnText,
								payload,
								...rest
							}
						}
					}),
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
					enter: false,
					state: 'idle',
					dragged: null,
					item: null
				},
				setDragState: (flag) => {
					const props = { ...get().dragState }
					if (flag.dragged === null || flag.dragged === undefined) {
						props.enter = false
					}
					set({
						dragState: {
							...props,
							...flag
						}
					})
				},
				refreshAccount: () => {
					localStorage.removeItem('X-ACCESS-TOKEN')
					localStorage.removeItem('X-REFRESH-TOKEN')
					return set({ atk: null, rtk: null, isLogin: false, user: null })
				},
				refreshPopup: () =>
					set({
						popup: {
							isOpen: false,
							key: '',
							message: '',
							btnText: '',
							btnHide: false,
							payload: {
								confirm: () => {},
								cancel: () => {}
							}
						}
					})
			}))
		),
		{ enabled: process.env.NODE_ENV !== 'production' }
	)
)

store.subscribe(
	({ atk }) => ({ atk }),
	({ atk }) => {
		if (atk) {
			localStorage.setItem('X-ACCESS-TOKEN', atk)
			axios.defaults.headers['X-ACCESS-TOKEN'] = atk
		} else {
			delete axios.defaults.headers['X-ACCESS-TOKEN']
		}
	},
	{
		equalityFn(a, b) {
			return a.atk === b.atk
		},
		fireImmediately: true
	}
)
store.subscribe(
	({ rtk }) => ({ rtk }),
	({ rtk }) => {
		if (rtk) {
			localStorage.setItem('X-REFRESH-TOKEN', rtk)
		}
	},
	{
		equalityFn(a, b) {
			return a.rtk === b.rtk
		},
		fireImmediately: true
	}
)

store.subscribe(
	({ user }) => ({ user }),
	({ user }) => {
		store.setState({ isLogin: !!user })
	},
	{
		equalityFn(a, b) {
			return a.user?.email === b.user?.email
		},
		fireImmediately: true
	}
)

export const useCommonStore = store.getState()

export default store
