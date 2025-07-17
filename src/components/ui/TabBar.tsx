import CustomIcon from '@/components/base/icon'
import { TablerIcons } from '@/components/base/icon/TablerIconsInterop'
import { Text } from '@/components/base/text'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import { useTranslation } from '@/locales/i18n'
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Platform, StyleSheet, TouchableOpacity, View } from 'react-native'
import { twMerge } from 'tailwind-merge'

export const TABBAR_HEIGHT = 120

interface TABBARsType {
  name: string
  icon: keyof typeof TablerIcons
  iconActive: keyof typeof TablerIcons
  label: string
}
const TABBARs: TABBARsType[] = [
  {
    name: 'index',
    icon: 'IconFolder',
    iconActive: 'IconFolderFilled',
    label: 'app.tabbar.home'
  }
]

const Style = StyleSheet.create({
  Container: {
    boxShadow: Platform.OS === 'ios' ? '0px 2px 8px 3px rgba(0,0,0,0.085)' : '0px 2px 8px 3px rgba(0,0,0,0.1)'
  }
})

const TabBar: React.FC<BottomTabBarProps> = ({ state, descriptors, navigation }) => {
  const { t } = useTranslation()

  return (
    <View className='absolute bottom-0 left-0 right-0 bg-white shadow-lg' style={[Style.Container]}>
      <SafeAreaWrapper noneFocus={['top']}>
        <View className='bottom-0 flex-row justify-between items-center mx-0 py-3 px-0'>
          {TABBARs.map((item, index) => {
            const route = state.routes.find(x => x.name == item.name)
            const tabbars = TABBARs[index]
            const isFocused = state.routeNames[state.index] === item.name
            if (['_sitemap', '+not-found'].includes(route?.name || '')) return null

            if (route) {
              const { options } = descriptors[route.key]
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true
                })

                if (!isFocused && !event.defaultPrevented) {
                  navigation.navigate(route.name, route.params)
                }
              }

              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key
                })
              }

              return (
                <TouchableOpacity
                  key={item.name}
                  className='flex-1'
                  accessibilityRole='button'
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  onPress={onPress}
                  onLongPress={onLongPress}
                >
                  <View className='gap-1 justify-center items-center'>
                    <CustomIcon
                      name={isFocused ? tabbars.iconActive : tabbars.icon}
                      className={isFocused ? 'text-primary-500' : 'text-text-secondary'}
                    />
                    <Text
                      className={twMerge('text-sm font-normal', isFocused ? 'text-primary-500' : 'text-text-secondary')}
                    >
                      {t(tabbars.label)}
                    </Text>
                  </View>
                </TouchableOpacity>
              )
            } else return null

            // return (
            //   <TabBarButton
            //     key={route.name}
            //     style={styles.tabbarItem as ViewStyle}
            //     onPress={onPress}
            //     onLongPress={onLongPress}
            //     isFocused={isFocused}
            //     routeName={route.name}
            //     color={isFocused ? primaryColor : greyColor}
            //     label={label}
            //   />
            // )
          })}
        </View>
      </SafeAreaWrapper>
    </View>
  )
}

export default TabBar
