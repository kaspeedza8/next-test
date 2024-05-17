'use client';
import React, { useEffect, useState } from 'react'
import './styles.css'
import { FaEye, FaEyeSlash, FaLock } from 'react-icons/fa6';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import Link from 'next/link'
import { signIn, useSession } from 'next-auth/react';
import { MdEmail } from 'react-icons/md';

function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isShowPassword, setIsShowPassword] = useState(false)
  const { data: session } = useSession()

  useEffect(() => {
    if (session) return router.replace('/')
  }, [session?.user])

  const LockOrUnlockIcon = !isShowPassword ?
    <FaEye onClick={togglePassword} className='icon_right' /> :
    <FaEyeSlash onClick={togglePassword} className='icon_right' />

  function togglePassword() {
    setIsShowPassword(!isShowPassword)
  }

  function navToRegister() {
    router.push('/RegisterPage')
  }

  async function onClickLoginButton(e: any) {
    e.preventDefault()
    try {
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      })

      if (res?.error) {
        setError(res.error)
        return
      }

      router.replace('welcome')

    } catch (error: any) {
      console.log('on Error View LoginButton', error)
      setError(error.message)
    }
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
              priority={true}
              src="/macbook.png"
              alt={`"Mobile developer "Rookie Dev"`}
              style={{ objectFit: "contain" }}
              width={300}
              height={300}
            />
          </div>

        </div>

        <div className="flex-1 flex flex-col justify-between bg-white border border-blue-500">

          <div className='h-1/4 justify-center align-middle flex flex-col'>
            <h1 className='text-[#2883cc] text-center text-lg font-semibold'>Rookie Dev.</h1>
          </div>

          <div className='h-full text-center flex flex-col'>

            <div className='m-10'>
              <h2 className='text-slate-400 text-balance'>Welcome to my web application</h2>
              <h3 className='text-slate-400 text-balance'>Develop by Next.js 14 framework</h3>

            </div>


            <form
              onSubmit={onClickLoginButton}
              className='form-control flex flex-col p-5 px-16 mt-10'>

              <div className="wrapper">
                <MdEmail className='icon' />
                <input
                  className="input_absolute input border border-stone-300 my-2 p-2 focus:border-teal-500 focus:outline-none"
                  placeholder='email'
                  type='email'
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="wrapper">
                <FaLock className='icon' />
                <input
                  className="input_absolute input border border-stone-300 my-2 p-2 focus:border-teal-500 focus:outline-none"
                  placeholder='password'
                  type={isShowPassword ? 'text' : 'password'}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {LockOrUnlockIcon}
              </div>

              <div className=''>
                {error &&
                  <p className='text-sm text-red-500 text-center'>{`Please check email or password again (${error})`}
                  </p>}

              </div>


              <button
                className="
                btn btn-primary
                bg-bluePrimary 
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
                  onClick={navToRegister}
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