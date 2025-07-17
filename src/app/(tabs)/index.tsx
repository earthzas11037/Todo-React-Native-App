import { Todo } from '@/common/interface/todo'
import { Button } from '@/components/base/button'
import { Text } from '@/components/base/text'
import TodoCard from '@/components/share/TodoCard'
import MainLayout from '@/components/ui/MainLayout'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import { TABBAR_HEIGHT } from '@/components/ui/TabBar'
import { clearAll } from '@/lib/storage'
import useTodoStore from '@/stores/zustand/todo'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import React, { useCallback, useMemo } from 'react'
import { View } from 'react-native'

export default function TabHome() {
  const todoList = useTodoStore(state => state.todoList)
  const removeTodo = useTodoStore(state => state.removeTodo)
  const toggleCompletedTodo = useTodoStore(state => state.toggleCompletedTodo)

  const MemoItemCard = React.memo(TodoCard)

  const handleAdd = useCallback(() => router.push('/(app)/todo-add'), [])

  const handleRemove = useCallback((id: number) => removeTodo(id), [removeTodo])

  const handleToggleCompleted = useCallback((id: number) => toggleCompletedTodo(id), [toggleCompletedTodo])

  const handleClear = useCallback(clearAll, [])

  const listHeader = useMemo(
    () => (
      <View className='flex-row gap-2 justify-between mb-4'>
        <Text variant='Header1' className='flex-1'>
          To Do List
        </Text>
        <Button size='small' label='Add Todo' onPress={handleAdd} />
        <Button size='small' label='Clear' onPress={handleClear} />
      </View>
    ),
    [handleAdd, handleClear]
  )

  const renderItem = useCallback(
    ({ item }: { item: Todo }) => <MemoItemCard item={item} onToggle={handleToggleCompleted} onRemove={handleRemove} />,
    [handleToggleCompleted, handleRemove]
  )

  return (
    <View className='flex-1'>
      <SafeAreaWrapper className='flex-1'>
        <MainLayout className='flex-1'>
          <FlashList
            ListHeaderComponent={listHeader}
            showsVerticalScrollIndicator={false}
            data={todoList}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            contentContainerStyle={{ paddingBottom: TABBAR_HEIGHT + 24 }}
          />
        </MainLayout>
      </SafeAreaWrapper>
    </View>
  )
}
