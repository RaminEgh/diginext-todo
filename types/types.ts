export interface TodoInterface {
   id: number
   todo: string
   state: 'pending' | 'done'
   createdAt: Date
   updatedAt: Date
}
