import { Todo } from '@/common/interface/todo'
import { Button } from '@/components/base/button'
import { CardContainer } from '@/components/base/card/card-container'
import { Switch } from '@/components/base/checkbox'
import { Tag } from '@/components/base/tag'
import { Text } from '@/components/base/text'
import MainLayout from '@/components/ui/MainLayout'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import { TABBAR_HEIGHT } from '@/components/ui/TabBar'
import { clearAll } from '@/lib/storage'
import useTodoStore from '@/stores/zustand/todo'
import { formatToDateTime } from '@/utils/datetime'
import { FlashList } from '@shopify/flash-list'
import { router } from 'expo-router'
import { View } from 'react-native'

export default function TabHome() {
  const { removeTodo, toggleCompletedTodo } = useTodoStore()
  const todoList = useTodoStore(state => state.todoList)

  const renderItem = ({ item }: { item: Todo }) => {
    return (
      <CardContainer className='w-full p-4 mb-3 gap-2'>
        <View className=''>
          <View className='flex-row justify-between gap-1'>
            <Text variant='Title' className='flex-1'>
              {item.title}
            </Text>
            <Tag label={item.status} color={item.status == 'INPROGRESS' ? 'warning' : 'success'} />
          </View>
          <Text variant='Body'>{item.description}</Text>
        </View>
        <View>
          <Text variant='Time'>{`สร้างเมื่อ ${formatToDateTime(item.createdAt)}`}</Text>
          <Text variant='Time'>{`อัพเดทเมื่อ ${formatToDateTime(item.updatedAt)}`}</Text>
        </View>
        <View className='flex-row justify-between'>
          <Switch
            label='Completed'
            checked={item.status == 'COMPLETED'}
            onChange={() => handeleTogleCompleted(item.id)}
          />
          <Button label='ลบ' size='small' color='error' onPress={() => handleRemove(item.id)} />
        </View>
      </CardContainer>
    )
  }

  const renderHeader = () => {
    return (
      <View className='flex-row gap-2 justify-between'>
        <Text variant='Header1' className='flex-1'>
          To Do List
        </Text>
        <Button size='small' label='Add Todo' onPress={handleAdd} />
        <Button size='small' label='clear' onPress={clearAll} />
      </View>
    )
  }

  const handleAdd = () => {
    router.push('/(app)/todo-add')
  }

  const handleRemove = (id: number) => {
    removeTodo(id)
  }

  const handeleTogleCompleted = (id: number) => {
    toggleCompletedTodo(id)
  }

  return (
    <View className='flex-1'>
      <SafeAreaWrapper className='flex-1'>
        <MainLayout className='flex-1'>
          <FlashList
            ListHeaderComponent={renderHeader}
            showsVerticalScrollIndicator={false}
            data={todoList}
            renderItem={renderItem}
            keyExtractor={item => `${item.id}`}
            estimatedItemSize={88}
            contentContainerStyle={{ paddingBottom: TABBAR_HEIGHT + 24 }}
          />
        </MainLayout>
      </SafeAreaWrapper>
    </View>
  )
}
