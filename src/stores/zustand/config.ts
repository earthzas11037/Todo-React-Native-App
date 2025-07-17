import { getConfiguration } from '@/services/api/app'
import { create } from 'zustand'

interface ConfigState {
  config: Record<string, string>
  setConfig: (config: Record<string, any>) => void
  fetchConfig: () => Promise<void>
  getConfig: (key: string) => string
}

export const useConfigStore = create<ConfigState>((set, get) => ({
  config: {},
  setConfig: config => set({ config }),
  fetchConfig: async () => {
    try {
      const config = await getConfiguration()
      const configMap = config.reduce((acc, config) => {
        acc[config.key] = config.value
        return acc
      }, {} as { [key: string]: string })

      set({ config: configMap })
      console.log('✅ Config fetched successfully:')
    } catch (error) {
      console.error('❌ Error during initialization:', error)
      throw error
    }
  },
  getConfig(key) {
    return get().config[key] || ''
  }
}))
