export interface AppVersion {
  id: number
  version: string
  buildNumber: string
  description: string
  status: string
}

export interface Configuration {
  id: number
  key: string
  value: string
}
