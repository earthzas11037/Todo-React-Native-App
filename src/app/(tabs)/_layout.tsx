/* eslint-disable react/no-unstable-nested-components */
import { Redirect, SplashScreen, Tabs } from 'expo-router'
import React, { useCallback, useEffect } from 'react'
import TabBar from '@/components/ui/TabBar'
import { useIsFirstTime } from '@/hooks/useIsFirstTime'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false
      }}
      tabBar={props => <TabBar {...props} />}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'หน้าแรก'
        }}
      />
    </Tabs>
  )
}
