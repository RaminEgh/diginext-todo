import { useState } from 'react'
import { TodoInterface } from '@/types/types'
import TodoInput from '@/components/todo/todo-input'

type Props = {
   item: TodoInterface
   toggleStateHandler: (id: number) => void
   deleteHandler: (id: number) => void
}
const TodoItem = ({ item, toggleStateHandler, deleteHandler }: Props) => {
   const [editable, setEditable] = useState(false)

   const onSave = () => {
      setEditable(false)
   }

   return (
      <li className='py-3 sm:py-4 px-2'>
         {editable ? (
            <TodoInput todo={item.todo} id={item.id} onSave={onSave} />
         ) : (
            <span className={`text-wrap text-sm font-medium text-gray-900 truncate dark:text-white ${item.state === 'done' ? 'line-through' : ''}`}>{item.todo}</span>
         )}

         <div className='flex items-end justify-between'>
            <time className='text-xs'>{new Date(item.updatedAt).toLocaleDateString('en-CA')}</time>
            <div className='flex justify-end' role='group'>
               <button
                  type='button'
                  onClick={() => toggleStateHandler(item.id)}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium text-white ${item.state === 'pending' ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'} border border-gray-200 rounded-s-lg  focus:z-10 focus:ring-2 dark:bg-green-800 dark:border-green-900`}
               >
                  Make as {item.state === 'pending' ? 'done' : 'pending'}
               </button>

               {!editable ? (
                  <button
                     type='button'
                     onClick={() => setEditable(true)}
                     className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-yellow-600 border-t border-b border-gray-200 hover:bg-yellow-700  focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white'
                  >
                     Edit
                  </button>
               ) : null}

               <button
                  type='button'
                  onClick={() => deleteHandler(item.id)}
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-500 border border-gray-200 rounded-e-lg hover:bg-red-800 focus:z-10 focus:ring-2 focus:ring-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white'
               >
                  Delete
               </button>
            </div>
         </div>
      </li>
   )
}

export default TodoItem
