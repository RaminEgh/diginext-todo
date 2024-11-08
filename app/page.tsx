'use client'
import dynamic from 'next/dynamic'
const TodoApp = dynamic(() => import('@/components/todo'), { ssr: false })
export default function Home() {
   return (
      <>
         <header className='bg-slate-50 dark:bg-slate-900'>
            <nav className='container mx-auto px-8 py-4 '>
               <strong className='text-2xl'>TODO List</strong>
            </nav>
         </header>
         <main className='container mx-auto px-8 py-8'>
            <TodoApp />
         </main>
      </>
   )
}
