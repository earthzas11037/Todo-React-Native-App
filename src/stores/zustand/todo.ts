import { Todo } from '@/common/interface/todo'
import { MMKVStorage } from '@/lib/storage'
import { create } from 'zustand'
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware'

const DEFAULT_TODO: Todo[] = [
  {
    id: 1,
    title: 'Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1Test 1',
    description: 'description 1',
    status: 'INPROGRESS',
    createdAt: '2025-07-17T14:48:00.000Z',
    updatedAt: '2025-07-17T14:48:00.000Z'
  },
  {
    id: 2,
    title: 'Test 2',
    description: 'description 1',
    status: 'INPROGRESS',
    createdAt: '2025-07-17T14:48:00.000Z',
    updatedAt: '2025-07-17T14:48:00.000Z'
  },
  {
    id: 3,
    title: 'Test 3',
    description: 'description 1',
    status: 'INPROGRESS',
    createdAt: '2025-07-17T14:48:00.000Z',
    updatedAt: '2025-07-17T14:48:00.000Z'
  }
]

interface TodoState {
  todoList: Todo[]
  addTodo: (item: Todo) => Promise<void>
  updateTodo: (item: Todo) => Promise<void>
  toggleCompletedTodo: (id: number) => Promise<void>
  removeTodo: (id: number) => Promise<void>
}

export const useTodoStore = create<TodoState>()(
  persist(
    (set, get) => ({
      todoList: DEFAULT_TODO,
      addTodo: async (item: Todo) => {
        set(state => ({
          todoList: [
            ...state.todoList,
            {
              id: Date.now(),
              title: item.title,
              description: item.description,
              status: 'INPROGRESS',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString()
            }
          ]
        }))
      },
      updateTodo: async (item: Todo) => {
        set(state => ({
          todoList: state.todoList.map(todo =>
            todo.id === item.id
              ? {
                  ...item,
                  updatedAt: new Date().toISOString()
                }
              : todo
          )
        }))
      },
      toggleCompletedTodo: async (id: number) => {
        set(state => ({
          todoList: state.todoList.map(todo => (todo.id === id ? { ...todo, status: 'COMPLETED' } : todo))
        }))
      },
      removeTodo: async (id: number) => {
        set(state => ({
          todoList: state.todoList.filter(todo => todo.id !== id)
        }))
      }
    }),
    {
      name: 'todo-list', // name of the item in the storage (must be unique)
      storage: MMKVStorage // (optional) by default, 'localStorage' is used
    }
  )
)
export default useTodoStore
