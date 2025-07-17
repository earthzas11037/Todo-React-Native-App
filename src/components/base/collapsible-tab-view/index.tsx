import React from 'react'
import {
  Tabs,
  MaterialTabBar,
  CollapsibleProps,
  MaterialTabBarProps,
  MaterialTabItemProps,
  MaterialTabItem,
  TabItemProps
} from 'react-native-collapsible-tab-view'
import { Dimensions } from 'react-native'
import colors from '@/config/theme/colors'
import { Text } from '@/components/base/text'
import { twMerge } from 'tailwind-merge'

// Custom TabBar Component
const CustomTabBar: React.FC<MaterialTabBarProps<any>> = props => {
  const { width } = Dimensions.get('window')
  return (
    <MaterialTabBar
      {...props}
      activeColor={colors.primary[500]}
      inactiveColor={colors.text.primary}
      style={{
        backgroundColor: 'transparent'
      }}
      contentContainerStyle={{}}
      labelStyle={{}}
      tabStyle={{}}
      TabItemComponent={({ focusable, ...rest }: MaterialTabItemProps<any>) => {
        return (
          <MaterialTabItem
            {...rest}
            activeColor={colors.primary[500]}
            label={(itemProps: TabItemProps<any>) => {
              const isFocused = props.focusedTab.value == itemProps.name
              return (
                <Text
                  className={twMerge(`text-center px-5 py-2`)}
                  style={{ width: width / props.tabNames.length, color: props.activeColor }}
                >
                  {itemProps.name as String}
                </Text>
              )
            }}
          />
        )
      }}
      indicatorStyle={{
        backgroundColor: colors.primary[500],
        shadowOpacity: 0
      }}
      scrollEnabled
    />
  )
}

// Custom Tabs.Container with default TabBar customization
const CustomTabsContainer: React.FC<CollapsibleProps> = props => {
  return (
    <Tabs.Container
      {...props}
      renderTabBar={tabBarProps => <CustomTabBar {...tabBarProps} />}
      headerContainerStyle={{ shadowOpacity: 0, borderColor: colors.divider, borderBottomWidth: 1 }}
    />
  )
}

// Re-export Tabs components
const CustomTabs = {
  Container: CustomTabsContainer,
  Tab: Tabs.Tab,
  ScrollView: Tabs.ScrollView,
  FlatList: Tabs.FlatList,
  SectionList: Tabs.SectionList,
  Lazy: Tabs.Lazy,
  FlashList: Tabs.FlashList,
  MasonryFlashList: Tabs.MasonryFlashList
}

export { CustomTabs }
export * from 'react-native-collapsible-tab-view' // Export all props and types
