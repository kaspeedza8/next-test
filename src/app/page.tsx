"use client"
import { useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import Navbar from "./components/Navbar";
import { AiOutlineCaretRight } from "react-icons/ai";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store";
import { useAppDispatch } from "@/lib/hooks";
import { addTitle, removeByIndex } from "@/lib/features/todos/todoSlice";
import { useBearStore } from "@/store/bearStore";
import { setLoading } from "@/lib/features/loading/loadingSlice";
import axios from "axios";
import Footer from "./components/Footer";

export interface foodType {
  idCategory: string;
  strCategory: string
  strCategoryThumb: string
  strCategoryDescription: string
}

export default function Home() {
  const [yourType, setYourType] = useState('')
  const titleArr = useSelector((state: RootState) => state.todoReducer.data)
  const dispatch = useAppDispatch()
  const setCustomNumbers = useBearStore((state) => state.setCustomNumbers)
  const bears = useBearStore((state) => state.bears)
  const { data: session } = useSession()
  const router = useRouter()
  const [food, setFood] = useState<foodType[]>([])
  const [search, setSearch] = useState('')
  const [selectedItem, setSelectedItem] = useState<foodType>()

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

  if (!session) {
    redirect("/LoginPage")
  }

  useEffect(() => {
    if (food.length == 0) {
      fetchTheFood()
    }
    return () => { }
  }, [])


  async function fetchTheFood() {
    try {
      dispatch(setLoading(true))
      const res = await axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
      const resData = res.data.categories
      resData.length > 0 && setFood(resData)
    } catch (error) {
      console.log('error', error)
    } finally {
      dispatch(setLoading(false))
    }
  }

  return (
    <main className="mx-auto px-0">
      <Navbar session={session} />

      {/* Modal Image Full Data View */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box space-y-1">
          <h3 className="text-lg text-center font-bold">{selectedItem?.strCategory}</h3>
          <figure className="flex justify-center">
            <img
              src={selectedItem?.strCategoryThumb} alt="Album" />
          </figure>
          <p className="py-4">{selectedItem?.strCategoryDescription}</p>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">CC</label>
      </div>

      {/* Body */}
      <div className="container m-auto">

        <h1 className="text-center text-white text-lg mb-10 mt-5">Library stress test</h1>

        {/* BOX TOP */}
        <div className="box-content flex">

          <div className="box-a-side box-content flex-1 py-5 space-y-3">
            <h2 className="text-center text-red-500">Redux Toolkit + Persist</h2>
            <div className="items-center justify-center flex space-x-2">
              <input
                type="text"
                value={yourType}
                onChange={(e) => setYourType(e.target.value)}
                maxLength={20}
                placeholder="Type something to save the word ."
                className="input input-bordered input-ghost w-full max-w-xs" />

              <div
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

            <div className="px-6">
              {titleArr.length > 0 &&
                <div
                  className="  ml-4 rounded-md p-2 space-y-1 space-x-2">
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

          </div>

          <div className="box-b-side box-content flex-1 py-5 space-y-3">
            <h2 className="text-center text-red-500">Zustand Global State Test {bears}</h2>

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

        {/* BOTTOM BOX */}
        <div className="box-content">

          <h2 className="text-center mb-10 text-red-500">API + Search Filter</h2>

          <div className="flex justify-center">
            <label className="input input-bordered flex items-center gap-2 w-1/2">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text" className="grow" placeholder="Search" />
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
              </svg>
            </label>
          </div>

          {search.length > 1 &&
            <div className="flex justify-center">
              <p
                onClick={() => setSearch('')}
                className="link link-primary">
                reset
              </p>
            </div>
          }

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 m-10 gap-2 overflow-auto max-h-lvh p-2">

            {
              food.length > 0 &&
              food.filter((item: foodType) => item.strCategory.toLowerCase().includes(search.toLowerCase())).map((item: foodType) => {
                return (
                  <div
                    key={item.idCategory}
                    className="card bg-base-100 shadow-xl">
                    <figure>
                      <img
                        src={item.strCategoryThumb} alt="Album" /></figure>
                    <div className="card-body">
                      <h2 className="card-title">{item.strCategory}</h2>
                      <p className="line-clamp-2">{item.strCategoryDescription}</p>
                      <div className="card-actions justify-end">
                        <label
                          onClick={() => setSelectedItem(item)}
                          htmlFor="my_modal_7"
                          className="btn btn-outline btn-secondary">Expand</label>
                      </div>
                    </div>
                  </div>
                )
              })
            }

          </div>


        </div>





      </div>

      {/* Footer */}
      <Footer />

    </main>
  );
}
