export interface Todo {
  id: number
  title: string
  description: string
  status: 'INPROGRESS' | 'COMPLETED'
  createdAt: string
  updatedAt: string
}
