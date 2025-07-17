import { MMKV } from 'react-native-mmkv'
import { PersistStorage, StateStorage } from 'zustand/middleware'

export const storage = new MMKV()

export const getItem = <T>(key: string): T | null => {
  const value = storage.getString(key)
  if (!value) return null
  try {
    return JSON.parse(value) as T
  } catch {
    return value as unknown as T
  }
}

export const setItem = <T>(key: string, value: string | number | boolean | object) => {
  if (typeof value === 'object') {
    storage.set(key, JSON.stringify(value))
  } else {
    storage.set(key, value)
  }
}

export const removeItem = async (key: string) => {
  storage.delete(key)
}

export const clearAll = async () => {
  storage.clearAll()
}

export const getAllKeys = async () => {
  return storage.getAllKeys()
}

export const MMKVStorage: PersistStorage<any> = {
  setItem: setItem,
  getItem: getItem,
  removeItem: removeItem
}
