import { createContext, Dispatch, SetStateAction } from 'react'

export const StoreContext = createContext<{
   store: StoreContextType
   setStore: Dispatch<SetStateAction<StoreContextType>>
}>({
   store: {},
   setStore: () => {}
})
