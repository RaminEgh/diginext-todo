'use client'
import { FC } from 'react'
import { StoreProvider } from '@/providers/store-provider'
import TodoInput from '@/components/todo/todo-input'
import TodoList from '@/components/todo/todo-list'

const TodoApp: FC = () => {
   return (
      <StoreProvider>
         <div className='flex flex-col gap-4'>
            <TodoInput />
            <TodoList />
         </div>
      </StoreProvider>
   )
}

export default TodoApp
