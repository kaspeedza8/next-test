'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useSession } from 'next-auth/react'
import { redirect, useRouter } from 'next/navigation'
import { useAppDispatch } from '@/lib/hooks'
import { setLoading } from '@/lib/features/loading/loadingSlice'

function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [isPasswordConflict, setIsPasswordConflict] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const { data: session } = useSession()
  if (session) return redirect('/')

  useEffect(() => {

    if (confirmPassword.length > 2 && password !== confirmPassword) {
      setIsPasswordConflict(true)
    } else {
      setIsPasswordConflict(false)
    }

    return () => {
    }
  }, [password, confirmPassword])


  const handleSubmit = async (e: any) => {
    setError("")
    e.preventDefault()

    if (password != confirmPassword) {
      setError('Password do not match')
      return
    }

    if (!name || !email || !password || !confirmPassword) {
      setError('Please Check your input')
      return
    }

    dispatch(setLoading(true))

    try {

      const checkUserResponse = await axios.post('http://localhost:3000/api/checkUser', {
        email
      })

      const isUserAlreadyExist = checkUserResponse.data.user

      if (isUserAlreadyExist) {
        setError('User already exists !')
        return
      }

      const res = await fetch("http://localhost:3000/api/register", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      if (res.ok) {
        const form = e.target;
        setError("")
        setSuccess("User registration successfully!")
        setName('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        setIsPasswordConflict(false)
        form.reset()
        router.replace('LoginPage')
      } else {
        console.log("User registration failed.")
      }

    } catch (error) {
      console.log('Error during registration ', error)
    } finally {
      setTimeout(() => {
        dispatch(setLoading(false))
      }, 1000);
    }
  }

  return (
    <div className=' flex flex-col justify-center items-center h-lvh w-full'>
      <h2 className='text-lg'>Register Page</h2>
      <hr className='my-3' />
      <form className='form-control container md:px-40 px-10 space-y-2' onSubmit={handleSubmit}>

        {error && (
          <div className='bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
            {error}
          </div>
        )}

        {success && (
          <div className='bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2'>
            {success}
          </div>
        )}

        <input
          onChange={(e) => setName(e.target.value)}
          className='input-ghost rounded block p-2 round-md'
          type='text'
          placeholder='Enter your name'
        />
        <input
          onChange={(e) => setEmail(e.target.value)}
          className='input-ghost rounded block p-2 round-md'
          type='email'
          placeholder='Enter your email'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className='input-ghost rounded block p-2 round-md'
          type='password'
          placeholder='Enter your password'
          onBlur={() => setIsPasswordConflict(false)}
        />
        {isPasswordConflict ? <p className='text-sm text-red-400 ml-1 mb-2'>passwords don't match</p> : <div className='mb-2' />}
        <input
          onChange={(e) => setConfirmPassword(e.target.value)}
          className='input-ghost rounded block p-2 round-md'
          type='password'
          placeholder='Confirm your password'
          onBlur={() => setIsPasswordConflict(false)}
        />
        {isPasswordConflict ? <p className='text-sm text-red-400 ml-1 mb-2'>passwords don't match</p> : <div className='mb-2' />}
        <button type='submit' className='btn btn-accent'>
          Sign Up
        </button>
      </form>
      <hr className='my-3' />
      <p>
        Do not have an account? go to{' '}
        <Link className='text-blue-500 hover:underline' href='/LoginPage'>
          Login
        </Link>{' '}
        Page
      </p>
    </div>
  )
}

export default RegisterPage
