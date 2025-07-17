import { Todo } from '@/common/interface/todo'
import { Button } from '@/components/base/button'
import { Input } from '@/components/base/input'
import MainLayout from '@/components/ui/MainLayout'
import { getNormalNavbar } from '@/components/ui/NavBar'
import SafeAreaWrapper from '@/components/ui/SafeAreaWrapper'
import useTodoStore from '@/stores/zustand/todo'
import { router, Stack } from 'expo-router'
import { Controller, useForm } from 'react-hook-form'

export default function TabHome() {
  const { addTodo } = useTodoStore()
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<Todo>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: ''
    }
  })

  const onSubmit = async (data: Todo) => {
    addTodo(data)
    router.back()
  }

  return (
    <SafeAreaWrapper noneFocus={['top']} className='flex flex-1'>
      <Stack.Screen options={getNormalNavbar({ title: 'เพื่ม' })} />
      <MainLayout className='flex-1 gap-4'>
        <Controller
          control={control}
          name='title'
          rules={{
            required: 'กรุณากรอกข้อมูล'
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              label='Title'
              placeholder='หัวข้อ'
              value={value}
              onChangeText={onChange}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Controller
          control={control}
          name='description'
          rules={{
            required: 'กรุณากรอกข้อมูล'
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              label='Description'
              placeholder='รายละเอียด'
              value={value}
              onChangeText={onChange}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          )}
        />
        <Button disabled={!isValid} label='บันทึก' fullWidth className='mt-2' onPress={handleSubmit(onSubmit)} />
      </MainLayout>
    </SafeAreaWrapper>
  )
}
