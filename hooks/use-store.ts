import { useContext, useEffect, useCallback, useState } from 'react'
import { StoreContext } from '@/contexts/store-context'

const useStore = <T>(
   key: string,
   initialValue?: T | null,
   storeInLocalStorage: boolean = true
): [T, (value: T) => void, boolean] => {
   const { store, setStore } = useContext(StoreContext)

   const initializeState = useCallback(() => {
      if (storeInLocalStorage) {
         const storedValue = localStorage.getItem(key)
         return storedValue !== null ? JSON.parse(storedValue) : initialValue
      }

      return initialValue || null
   }, [key, initialValue, storeInLocalStorage])

   const [isLoading, setIsLoading] = useState<boolean>(true)
   const [localValue, setLocalValue] = useState<T | undefined>(initializeState)

   useEffect(() => {
      setIsLoading(true)

      if (storeInLocalStorage && localValue !== undefined) {
         localStorage.setItem(key, JSON.stringify(localValue))
      }
      setStore((prevStore) => ({
         ...prevStore,
         [key]: localValue
      }))

      setIsLoading(false)
   }, [key, localValue, storeInLocalStorage, setStore])

   const setValue = useCallback(
      (value: T) => {
         setLocalValue(value)
         setStore((prevStore) => ({
            ...prevStore,
            [key]: value
         }))

         if (storeInLocalStorage) {
            localStorage.setItem(key, JSON.stringify(value))
         }
      },
      [key, storeInLocalStorage, setStore]
   )

   return [store[key] !== undefined ? (store[key] as T) : (localValue as T), setValue, isLoading]
}

export default useStore
