'use client'
import { FC } from 'react'
import { TodoInterface } from '@/types/types'
import useStore from '@/hooks/use-store'
import Loading from '@/components/loading'
import TodoItem from '@/components/todo/todo-item'

const TodoList: FC = () => {
   const [todos, setTodos, isLoading] = useStore<TodoInterface[]>('todos', [])
   if (isLoading) return <Loading />

   const toggleStateHandler = (id: number) => {
      const clonedTodoList = [...todos]
      const todo = clonedTodoList.find((item) => item.id === id)
      if (todo) {
         todo.state = todo.state === 'pending' ? 'done' : 'pending'
         todo.updatedAt = new Date()
         setTodos(clonedTodoList)
      }
   }

   const deleteHandler = (id: number) => {
      const index = todos.findIndex((item) => item.id === id)
      const clonedTodoList = [...todos]
      clonedTodoList.splice(index, 1)
      setTodos(clonedTodoList)
   }

   return (
      <>
         {todos.length > 0 ? (
            <ol className='list-decimal list-inside space-y-1 text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700'>
               {todos.map((item) => {
                  return (
                     <TodoItem
                        key={item.id}
                        item={item}
                        deleteHandler={deleteHandler}
                        toggleStateHandler={toggleStateHandler}
                     />
                  )
               })}
            </ol>
         ) : (
            <p className='text-center py-12 border rounded-2xl text-red-950 font-semibold'>Nothing to do</p>
         )}
      </>
   )
}

export default TodoList
