'use client'
import { FormEvent } from 'react'
import useStore from '@/hooks/use-store'
import { TodoInterface } from '@/types/types'

type Props = {
   id?: number
   todo?: string
   onSave?: () => void
}
const TodoInput = (props: Props) => {
   const [todoList, setTodoList, isLoading] = useStore<TodoInterface[]>('todos', [])

   const onSubmitTodoHandler = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.target as HTMLFormElement

      const todoInputValue = (form.elements.namedItem('todo') as HTMLInputElement).value

      if (props.id) {
         const todo = todoList.find((item) => item.id)
         if (todo && props.onSave) {
            todo.todo = todoInputValue
            todo.updatedAt = new Date()
            setTodoList(todoList)
            props.onSave()
         }
      } else {
         const todoListLength = todoList.length
         const todoObject: TodoInterface = {
            id: todoListLength > 0 ? todoList[todoListLength - 1].id + 1 : 1,
            todo: todoInputValue,
            state: 'pending',
            createdAt: new Date(),
            updatedAt: new Date()
         }
         setTodoList([...todoList, todoObject])
      }

      form.reset()
   }

   return (
      <form onSubmit={onSubmitTodoHandler}>
         <div className='flex items-center'>
            <input
               defaultValue={props?.todo}
               disabled={isLoading}
               minLength={1}
               type='text'
               id='todo'
               name='todo'
               className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
               placeholder='Type your todo and press enter'
               aria-label='to do input'
               required
            />
            <input
               className='items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white'
               type='submit'
               hidden={!props.id}
               value='Save'
            />
         </div>
      </form>
   )
}

export default TodoInput
