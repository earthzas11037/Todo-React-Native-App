import { Text } from '@/components/base/text'
import colors from '@/config/theme/colors'
import React, { ReactNode, useEffect, useState } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native'
import { TabView as RNTabView, TabBar } from 'react-native-tab-view'
import { twMerge } from 'tailwind-merge'

interface TabProps {
  children: ReactNode
  label: string
  subtitle?: string
  tabIcon?: string
  disabled?: boolean
}

const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>

interface TabsProps {
  children: ReactNode
  inactiveColor?: string
  activeColor?: string
  indicatorColor?: string
  indicatorWidth?: string
  tabbarColor?: string
  className?: string
  tabbarWidth?: number
  indexTab?: number
  setIndex?: (value: number) => void
  onIndexChange?: (value: number) => void
  swipeEnabled?: boolean
  initialLayout?: {
    width?: number
    height?: number
  }
}

// Go to use CustomTabs
const Tabs: React.FC<TabsProps> & { Tab: React.FC<TabProps> } = ({
  children,
  inactiveColor = colors.text.primary,
  activeColor = colors.primary[500],
  indicatorColor = 'bg-black',
  indicatorWidth = '2px',
  tabbarColor = 'bg-white',
  className,
  tabbarWidth,
  indexTab = 0,
  setIndex,
  onIndexChange,
  swipeEnabled = true,
  initialLayout = {
    width: Dimensions.get('window').width
  }
}) => {
  const [index, setLocalIndex] = useState(indexTab)
  const [routes, setRoutes] = useState<any[]>([])
  const [hasSubTitle, setHasSubTitle] = useState(false)

  useEffect(() => {
    const rawRoutes = React.Children.map(children, (child: any, idx) => {
      if (child.props.subtitle) setHasSubTitle(true)
      return {
        key: String(idx),
        title: child.props.label,
        subtitle: child.props.subtitle || '',
        icon: child.props.tabIcon || '',
        disabled: child.props.disabled || false
      }
    })
    setRoutes(rawRoutes || [])
  }, [children])

  const handleIndexChange = (newIndex: number) => {
    setLocalIndex(newIndex)
    setIndex?.(newIndex)
    onIndexChange?.(newIndex)
  }

  const renderTabBar = (props: any) => (
    <TabBar
      {...props}
      activeColor={activeColor}
      inactiveColor={inactiveColor}
      style={{
        backgroundColor: 'transparent'
      }}
      contentContainerStyle={{
        borderColor: colors.divider,
        borderBottomWidth: 1
      }}
      //   style={twMerge(tabbarColor, 'elevation-4', tabbarWidth && `w-[${tabbarWidth}px]`)}
      //   indicatorStyle={twMerge(indicatorColor, `h-[${indicatorWidth}]`)}
      //   labelStyle='text-sm'
      renderLabel={({ route, focused }: any) => (
        <View className='flex justify-center items-center'>
          <Text className='text-center'>{route.title}</Text>
          {route.subtitle && <Text style={styles.subtitle}>{route.subtitle}</Text>}
        </View>
      )}
      indicatorStyle={{
        backgroundColor: colors.primary[500]
      }}
    />
  )

  const renderScene = ({ route }: { route: { key: string } }) => {
    const child = React.Children.toArray(children)[Number(route.key)]
    return <>{child}</>
  }

  return (
    <View className={twMerge('flex-1', className)}>
      <RNTabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        initialLayout={initialLayout}
        renderTabBar={renderTabBar}
        swipeEnabled={swipeEnabled}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  activeLabel: {
    // color: 'black',
    // fontWeight: 'bold'
  },
  inactiveLabel: {
    // color: 'gray'
  },
  subtitle: {
    // color: 'darkgray',
    // fontSize: 12
  }
})

Tabs.Tab = Tab

export default Tabs
