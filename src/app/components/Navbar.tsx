"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { signOut } from 'next-auth/react'
import { TbBrandNextjs } from 'react-icons/tb'
import { FaUserSecret } from 'react-icons/fa'
import { HiLogout } from 'react-icons/hi'
import { useBearStore } from '@/store/bearStore'
import { BiUser } from 'react-icons/bi'
import { useAppDispatch } from '@/lib/hooks'
import { setLoading } from '@/lib/features/loading/loadingSlice'
function Navbar({ session }: any) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const bears = useBearStore((state) => state.bears)
  const dispatch = useAppDispatch()

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen)
  }

  function handleSignOut() {
    dispatch(setLoading(true))
    signOut()
    setTimeout(() => {
      dispatch(setLoading(false))
    }, 1000);
  }

  return (
    <nav className='bg-[#333] text-white py-3'>

      <div className={'md:flex md:flex-row md:justify-between md:items-center md:mx-3 space-y-1'}>

        <div >
          <Link
            className='flex items-center p-2'
            href={"/ConsolePage"} >
            <TbBrandNextjs
              className='w-5 h-5 mr-1'
              title='Next JS'
              aria-label='Next JS'
            />
            NextJS {bears && bears}
          </Link>

          <div className={`md:hidden absolute right-5 top-5`}>
            <button
              onClick={() => toggleMenu()}
              className='text-white'
            >
              <svg
                fill='none'
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth="2"
                viewBox='0 0 24 24'
                className='w-7 h-7 '
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>

        </div>



        <ul className='hidden md:flex space-x-4'>
          {
            !session ? (
              <>
                <li className='mx-3'><Link href={"/login"}>Sign In</Link></li>
                <li className='mx-3'><Link href={"/register"}>Sign Up</Link></li>
              </>
            ) :
              (
                <>
                  <li className=''>
                    <Link
                      target='_blank'
                      className='btn btn-neutral'
                      href={"https://rookiedev.netlify.app/"}>
                      <BiUser />
                      {session?.user?.name}</Link></li>
                  <li className=''>
                    <a
                      className='btn btn-outline btn-error'
                      onClick={handleSignOut}>
                      Logout
                    </a></li>
                </>
              )
          }
        </ul>

        {/* Mobile Menu */}
        {
          isMenuOpen &&
          <ul className='md:hidden space-y-2'>

            {
              !session ? (
                <>
                  <li className='mx-3'><Link href={"/login"}>Sign In</Link></li>
                  <li className='mx-3'><Link href={"/register"}>Sign Up</Link></li>
                </>
              ) :
                (
                  <>
                    <li className='mx-3 flex items-center space-x-1'>
                      <FaUserSecret />
                      <Link
                        target='_blank'
                        className='link link-hover hover:text-cyan-300'
                        href={"https://rookiedev.netlify.app/"}>Profile</Link></li>
                    <li className='mx-3 flex items-center space-x-1'>
                      <HiLogout />
                      <a
                        className='link link-hover hover:text-cyan-300'
                        onClick={() => signOut()}>
                        Logout
                      </a></li>
                  </>
                )
            }
          </ul>
        }

      </div>

    </nav>
  )
}

export default Navbar
