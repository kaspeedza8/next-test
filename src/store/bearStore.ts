import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface BearState {
 bears: number
 increaseBears: () => void
 decreaseBears: () => void
 removeAllBears: () => void
 setCustomNumbers: (n: number) => void
}

export const useBearStore = create<BearState>()(
 persist(
  (set) => ({
   bears: 0,
   increaseBears: () => set((state) => ({ bears: state.bears + 1 })),
   decreaseBears: () => set((state) => ({ bears: state.bears - 1 })),
   setCustomNumbers: (n: number) => set(() => ({ bears: n })),
   removeAllBears: () => set({ bears: 0 }),
  }),
  {
   name: 'bear-store', // default to LocalStorage
  }
 )
)
