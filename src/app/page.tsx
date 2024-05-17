"use client"
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Navbar from "./components/Navbar";
import { AiOutlineCaretRight } from "react-icons/ai";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { addTitle, removeByIndex } from "@/lib/features/todos/todoSlice";
import { useBearStore } from "@/store/bearStore";

export default function Home() {
  const [yourType, setYourType] = useState('')
  const titleArr = useSelector((state: RootState) => state.todoReducer.data)
  const dispatch = useAppDispatch()
  const setCustomNumbers = useBearStore((state) => state.setCustomNumbers)

  const numPad = [
    { num: 1 },
    { num: 2 },
    { num: 3 },
    { num: 4 },
    { num: 5 },
    { num: 6 },
    { num: 7 },
    { num: 8 },
    { num: 9 },
    { num: 0 },
  ]

  const { data: session } = useSession()
  if (!session) return redirect('/LoginPage')

  return (
    <main className="mx-auto px-0">
      <Navbar session={session} />

      <div className="container">

        <h1 className="text-center text-lg text-fuchsia-300 mb-10 mt-5">Library stress test</h1>


        {/* BOX TOP */}
        <div className="box-content flex justify-between">

          <div className="box-a-side box-content flex-1 py-5 space-y-3">
            <h2 className="text-center text-red-500">Redux Toolkit + Persist</h2>
            <div className="items-center justify-center flex space-x-2">
              <input
                type="text"
                value={yourType}
                onChange={(e) => setYourType(e.target.value)}
                maxLength={20}
                placeholder="Type something to save the word ."
                className="input input-bordered input-primary w-full max-w-xs" />

              <div
                onKeyUp={() => {
                  console.log('Hello 1')
                }}
                onClick={() => {
                  if (!yourType) {
                    alert("Please enter your type")
                    return
                  }
                  dispatch(addTitle(yourType))
                  setYourType('')
                }}
                className="p-1 transition-all duration-75 hover:p-2">
                <AiOutlineCaretRight
                  className="w-5 h-5 link link-primary"
                />
              </div>

            </div>

            {titleArr.length > 0 &&
              <div
                className="ml-4 rounded-md p-2 space-y-1 space-x-2">
                {titleArr.map((item: any, index: number) => (
                  <div
                    onClick={() => dispatch(removeByIndex(index))}
                    key={index}
                    className="badge badge-info gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-4 h-4 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    {item.title}
                  </div>
                ))}
              </div>
            }
          </div>

          <div className="box-b-side box-content flex-1 py-5 space-y-3">
            <h2 className="text-center text-red-500">Zustand Global State Test</h2>

            <div className="grid md:grid-cols-3 grid-cols-2 gap-4 justify-center">
              {
                numPad.map((item: any, index: number) => (
                  <kbd
                    key={index}
                    onClick={() => setCustomNumbers(item.num)}
                    className={`kbd btn btn-outline ${index === numPad.length - 1 ? 'col-start-2' : ''}`}
                  >
                    {item.num}
                  </kbd>
                ))
              }
            </div>

          </div>

        </div>





      </div>


    </main>
  );
}
