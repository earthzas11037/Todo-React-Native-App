import { create } from 'zustand'

const DELAY = 500
const SUCCESS_DELAY = 1500
type LOADING_STATE = 'HIDE' | 'SUCCESS' | 'ERROR'

const withDelay = (fn: () => void) => setTimeout(fn, DELAY)

interface AppState {
  loading: boolean
  state: LOADING_STATE
  setLoading: (loading: boolean, state?: LOADING_STATE) => void
}

const useAppStore = create<AppState>(set => ({
  loading: false,
  state: 'HIDE',
  setLoading: (loading: boolean, state: LOADING_STATE = 'HIDE') => {
    // if (loading && get().loading) return
    const execute = loading ? (fn: () => void) => fn() : withDelay

    if (state !== 'HIDE' && !loading) {
      set({ state })
      setTimeout(() => set({ loading, state: 'HIDE' }), SUCCESS_DELAY + DELAY)
    } else {
      execute(() => set({ loading }))
    }
  }
}))

export default useAppStore
