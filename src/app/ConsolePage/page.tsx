"use client"
import { RootState } from '@/lib/store'
import { useBearStore } from '@/store/bearStore'
import React from 'react'
import { useSelector } from 'react-redux'

function ConsolePage() {
  const bears = useBearStore((state) => state.bears)
  const titleArr = useSelector((state: RootState) => state.todoReducer.data)

  console.log(titleArr)
  return (
    <div className="container m-auto">

      <div className='m-10'>
        <h1 className='text-center'>Console</h1>
        <hr className='my-3' />
        <h2 className='text-center text-red-400 text-balance'>Zustand Data : {bears}</h2>


        <h2 className='mt-5 text-center text-slate-400 text-balance'>Redux Persist Store Data</h2>

        <div className='card card-body'>
          {
            titleArr.map((item: any, index: number) => (
              <p key={index} className='text-center'>{item.title}</p>
            ))
          }
        </div>

      </div>


    </div>
  )
}

export default ConsolePage