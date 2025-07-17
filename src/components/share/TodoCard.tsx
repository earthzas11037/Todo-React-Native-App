import { Todo } from '@/common/interface/todo'
import { Button } from '@/components/base/button'
import { CardContainer } from '@/components/base/card/card-container'
import { Switch } from '@/components/base/checkbox'
import { Tag } from '@/components/base/tag'
import { Text } from '@/components/base/text'
import { formatToDateTime } from '@/utils/datetime'
import React from 'react'
import { View } from 'react-native'

interface Props {
  item: Todo
  onToggle: (id: number) => void
  onRemove: (id: number) => void
}

const TodoCard = ({ item, onToggle, onRemove }: Props) => {
  console.log(item.id) // for check rerender
  return (
    <CardContainer className='w-full p-4 mb-3 gap-2'>
      <View>
        <View className='flex-row justify-between gap-1'>
          <Text variant='Title' className='flex-1'>
            {item.title}
          </Text>
          <Tag label={item.status} color={item.status === 'INPROGRESS' ? 'warning' : 'success'} />
        </View>
        <Text variant='Body'>{item.description}</Text>
      </View>

      <View>
        <Text variant='Time'>{`สร้างเมื่อ ${formatToDateTime(item.createdAt)}`}</Text>
        <Text variant='Time'>{`อัพเดทเมื่อ ${formatToDateTime(item.updatedAt)}`}</Text>
      </View>

      <View className='flex-row justify-between'>
        <Switch label='Completed' checked={item.status === 'COMPLETED'} onChange={() => onToggle(item.id)} />
        <Button label='ลบ' size='small' color='error' onPress={() => onRemove(item.id)} />
      </View>
    </CardContainer>
  )
}

export default TodoCard
