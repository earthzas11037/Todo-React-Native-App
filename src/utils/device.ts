import { Env } from '@env'
// import * as Application from 'expo-application'

export const getAppVersion = () => {
  /** Need to return App Version from ENV instead of Application.nativeBuildVersion
   * because Application.nativeBuildVersion cannot be change after app has been built
   */
  return Env.APP_VERSION
  // return Application.nativeApplicationVersion || ''
}

export const getAppBuildNumber = () => {
  /** Need to return Build Number from ENV instead of Application.nativeBuildVersion
   * because Application.nativeBuildVersion cannot be change after app has been built
   */
  return Env.APP_BUILD_NUMBER
  // return Application.nativeBuildVersion || ''
}
