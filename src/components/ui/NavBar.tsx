import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { NativeStackNavigationOptions } from '@react-navigation/native-stack'
import CustomIcon from '@/components/base/icon'
import { Text } from '@/components/base/text'
import { router } from 'expo-router'
import colors from '@/config/theme/colors'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/base/button'

interface NavBarProps {
  title: string
  hideLeft?: boolean
  darkMode?: boolean
  containerClassName?: string
  options?: {
    showOfflineMode?: boolean
  }
  menuActions?: { text: string; onClick: () => void }[]
  buttonRight?: React.ReactNode
}

export function getNormalNavbar({
  title,
  hideLeft,
  containerClassName,
  darkMode,
  menuActions,
  options: { showOfflineMode } = {},
  buttonRight
}: NavBarProps) {
  const stackNavigationOptions: NativeStackNavigationOptions = {
    headerTitleAlign: 'center',
    headerShown: true,
    headerStyle: {
      backgroundColor: colors.white
    },
    headerShadowVisible: false,
    title: title,
    header: () => (
      <SafeAreaWrapper noneFocus={['bottom']} className={twMerge('bg-white', containerClassName)}>
        <View className='flex-row items-center w-full px-4 py-2 pb-4 gap-1'>
          {hideLeft || !router.canGoBack() ? <View /> : ButtonBack(darkMode)}
          <View className='flex-1'>
            <Text
              variant='Subtitle'
              className={twMerge('text-text-primary text-center', darkMode ? 'text-white' : '')}
              numberOfLines={1}
            >
              {title}
            </Text>
          </View>
        </View>
      </SafeAreaWrapper>
    )
  }
  return stackNavigationOptions
}

export const ButtonBack = (darkMode?: boolean) => {
  return (
    <TouchableOpacity
      className={twMerge(darkMode ? 'border-white' : '')}
      onPress={() => {
        if (router.canGoBack()) router.back()
      }}
    >
      <CustomIcon
        name='IconArrowLeft'
        className={twMerge('text-text-primary', darkMode ? 'text-white' : '')}
        size={24}
      />
    </TouchableOpacity>
  )
}

export const ButtonOfflineMode = () => {
  return <Button size='small' className='w-fit rounded-full gap-0 py-0 px-3' label='ออฟไลน์' onPress={() => {}} />
}
