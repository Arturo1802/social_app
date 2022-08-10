import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { AiOutlineLogout } from 'react-icons/ai'
import { BiSearch } from 'react-icons/bi'
import { IoMdAdd } from 'react-icons/io'
import Logo from '../utils/app_logo.png'
import { createOrGetUser } from '../utils'
import useAuthStore from '../store/authStore'

export default function Navbar() { 
const {userProfile, addUser, removeUser} = useAuthStore();

  return (
    
    <div className='w-full flex justify-between  items-center border-b-2 bg-slate-500 border-gray-200 py-2 px-4' >
        <Link href="">
        <div className='w-[100px] ' >
            <Image className=' cursor-pointer'
                src={ Logo }
                alt="Chat app" 
                layout='responsive'>

            </Image>
        </div>
        </Link>
        <div>
          <form action="GET">
            <div>
            <BiSearch/>
            <input type="text" name="search" id="search" />
            </div>
          </form>
        </div>
        <div>
          {userProfile ? (
            <div className='flex gap-5 md:gap-10'>
              <Link href="/upload">
              <button className='border-2 px-2 bg-white rounded-2xl md:py-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className=' text-xl'/>
                <span className='hidden md:block'>Upload</span>
              </button>
              </Link>
              {userProfile.image && (
                <Link className=''
                href="/">
                  <>
                  <Image width={60} height={40} className='rounded-full px-2' alt='profile photo'   src={userProfile.image}/></>
                </Link>

              )}
              <button onClick={()=>{
                googleLogout();
                removeUser();
              }} className='px-2' type='button'>
                <AiOutlineLogout  color='red ' fontSize={34}/>
              </button>
              </div>
          ): (
            <GoogleLogin onSuccess={(response)=>createOrGetUser(response,addUser)} onError={()=>console.log('error')} />
          )
          }
        </div>
    </div>
  )
}
