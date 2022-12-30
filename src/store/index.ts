import create, { UseBoundStore } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { axios } from 'api'
import { PopupType, Tokens, User } from 'types'

type DragState = 'idle' | 'dragging' | 'pending' | 'complete'

interface IStore<T = any> {
	user?: null | User
	atk: string | null
	rtk: string | null
	isLogin: boolean
	isMainChange: boolean
	setIsMainChange: (flag: boolean) => void
	setIsLogin: (flag: boolean) => void
	popup?: PopupType
	setPopup: (payload: PopupType) => void
	setUser: (user: User) => void
	setNav: () => void
	showNav: boolean
	setTokens: (tokens: Tokens) => void
	dragState: {
		state: DragState
		dragged: T
	}
	setDragState: (flag: { state: DragState; dragged: T }) => void
	refreshAccount: () => void
	refreshPopup: () => void
}

const store = create(
	devtools(
		subscribeWithSelector(
			immer<IStore>((set) => ({
				user: null,
				isLogin: false,
				isMainChange: false,
				setIsMainChange: (flag) => set({ isMainChange: flag }),
				setIsLogin: (flag) => set((state) => ({ ...state, isLogin: flag })),
				showNav: false,
				atk: null,
				rtk: null,
				popup: undefined,
				setPopup: ({ btnText = '확인', payload = {}, ...rest }) =>
					set((state) => {
						if (!payload.cancel) {
							payload.cancel = state.refreshPopup
						}
						if (!payload.confirm) {
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
					state: 'idle',
					dragged: null
				},
				setDragState: ({ state, dragged }) =>
					set({
						dragState: {
							state,
							dragged
						}
					}),
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
		)
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

export const useCommonStore = store.getState()

export default store
