'use client';
import React, { useState } from 'react'
import './styles.css'
import { FaEye, FaEyeSlash, FaLock, FaUserTie } from 'react-icons/fa6';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link'

function LoginPage() {
  const router = useRouter()
  const [isShowPassword, setIsShowPassword] = useState(false)
  const LockOrUnlockIcon = !isShowPassword ?
    <FaEye onClick={togglePassword} className='icon_right' /> :
    <FaEyeSlash onClick={togglePassword} className='icon_right' />
  const [isOpenRegisterPanel, setIsOpenRegisterPanel] = useState(false)

  function togglePassword() {
    setIsShowPassword(!isShowPassword)
  }

  function handleSubmit(e: any) {
    e.preventDefault()
    router.push('/test')
  }

  function toggleRegister() {
    setIsOpenRegisterPanel((prev) => !prev)
  }

  return (
    <div className="flex bg">

      <div className="flex-1 bg-bluePrimary h-screen">
        <p className='text-gray-400'>L1</p>

      </div>

      <div className="flex-1 bg-[#1e80c8] h-screen">
        <p className='text-gray-400 text-right'>R1</p>
      </div>

      <div className='absolute bg-white w-10/12 h-5/6 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex'>

        <div className="flex-1 bg-[#2883cc] flex flex-col justify-center border ">

          <div
            className='flex'
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              justifyItems: 'flex-end',
              alignItems: 'flex-end',
            }}
          >
            <Image
              src="/macbook.png"
              alt={`"Mobile developer "Rookie Dev"`}
              style={{ objectFit: "contain" }}
              loading="lazy"
              width={300}
              height={300}
            />
          </div>

        </div>

        <div className="flex-1 flex flex-col justify-between bg-white border border-blue-500">

          <div className='h-1/4 justify-center align-middle flex flex-col'>
            <h1 className='text-center text-lg font-semibold'>Rookie Dev.</h1>
          </div>

          <div className='h-full text-center flex flex-col'>

            <div className='m-10'>
              <h2>Welcome to my web application</h2>
              <h3>Develop by Next.js 14 framework</h3>

            </div>


            <form
              onSubmit={handleSubmit}
              className='flex flex-col p-5 px-16 mt-10'>

              <div className="wrapper">
                <FaUserTie className='icon' />
                <input
                  className="input border border-stone-300 my-2 p-2"
                  placeholder='username or email'
                  type='email'
                />
              </div>

              <div className="wrapper">
                <FaLock className='icon' />
                <input
                  className="input border border-stone-300 my-2 p-2"
                  placeholder='password'
                  type={isShowPassword ? 'text' : 'password'}
                />
                {LockOrUnlockIcon}
              </div>


              <button
                className="bg-bluePrimary 
              hover:bg-white 
              hover:text-black 
              hover:border-cyan-500
              hover:border
              font-bold py-2 px-4 rounded mt-2 text-white
              "
              >
                Login
              </button>

              <div className='flex flex-wrap justify-between mt-1 
              '>
                <Link
                  href={'/test'}
                  className='text-center text-balance text-sm
                  text-gray-700 
                   hover:text-orange-300 
                  hover:underline
                  sm:text-red-600
                  md:text-green-400
                  '
                >
                  Guest mode
                </Link>
                <p
                  onClick={toggleRegister}
                  className='cursor-pointer text-center text-balance text-sm text-gray-500 hover:text-blue-400 hover:underline'>
                  Register
                </p>
              </div>


            </form>

          </div>

          <div className=' bg-gray-50 h-auto'>

            <p className='text-center text-balance text-sm text-gray-500'>
              copyright (c) 2024 Hello World and System.out.println
            </p>


          </div>

        </div>

      </div>

    </div >
  )
}


export default LoginPage