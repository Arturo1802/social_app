import React, { useState} from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link' 
import { ImCancelCircle} from 'react-icons/im'
import { AiFillHome, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai' 
import { Discover } from './Discover'
import { SuggestedAccounts } from './SuggestedAccounts'
import { Footer } from './Footer' 
import useAuthStore from '../store/authStore'
import { IoMdAdd } from 'react-icons/io'
import Image from 'next/image'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'


export default function Sidebar() {
  const normalLink= 'flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded'
  const [showSidebar, setShowSidebar] = useState(true); 
  const {userProfile, addUser, removeUser}   = useAuthStore();
  return (
    <div className='border-r-2 border-gray-200'>
      <div 
      onClick={() => setShowSidebar((prev)=> !prev)} className='block xl:hidden m-2 ml-4 mt-3 text-xl'
      >
        {showSidebar? <ImCancelCircle/>: <AiOutlineMenu/>}
        
      </div>
      {showSidebar && (
          <div className='xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-100
          xl:border-0 p-3'>
            <div className='xl:border-b-2 border-gray-200 xl:pb-4'>
              <Link href="/">
                <div className={normalLink}>
                <p className='text-2xl'>
                  <AiFillHome/>
                </p>
                <span className='text-xl hidden xl:block'>
                  Home
                </span>
                </div>
              </Link>
            </div>
             

{userProfile ? (
            <div className='flex py-4 px-4 gap-5 md:gap-10'>
               
              {userProfile.image && (
                <Link className=''
                href="/">
                  <>
                  <Image width={40} height={40} className='rounded-full' alt='profile photo'   src={userProfile.image}/>
                  {userProfile.name}
                  </>
                </Link>

              )}
              
              </div>
          ): (
            <GoogleLogin onSuccess={(response)=>createOrGetUser(response,addUser)} onError={()=>console.log('error')} />
          )
          }


            <Discover/>
            <SuggestedAccounts/>
            <Footer/>
          </div> 
        )}
    </div>
  )
}
