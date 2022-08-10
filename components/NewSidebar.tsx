import React, { useState} from 'react'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import Link from 'next/link' 
import {   ImArrowLeft} from 'react-icons/im'
import { AiFillHome, AiOutlineLogout, AiOutlineMenu } from 'react-icons/ai' 
import { Discover } from './Discover'
import { SuggestedAccounts } from './SuggestedAccounts'
import { Footer } from './Footer' 
import useAuthStore from '../store/authStore'
import { IoMdAdd } from 'react-icons/io'
import Image from 'next/image'
import { GoogleLogin, googleLogout } from '@react-oauth/google'
import { createOrGetUser } from '../utils'

interface IProps{
    pos:string; 
    discoverComp: boolean;
} 

const NewSidebar:NextPage<IProps> = ({pos, discoverComp}) => {
    const componentSet=()=>{
        if(discoverComp){
            return (<>
                <Discover   />
                <SuggestedAccounts/>
            </>);
        }
    }
    const [toggled, setToggled] = useState(false);
     

  return (  
           <div className={`${toggled ? "w-72" : "w-10" } flex flex-col rounded-xl duration-300 h-screen bg-slate-500 relative`}>
                <AiOutlineMenu  className={`${ toggled && "rotate-[90deg]"} py-1 mr-1 mt-1 rounded-full absolute ${pos}-0 bg-slate-400 text-3xl cursor-pointer `} onClick={( ) => setToggled((prev)=> !prev)}/>
                <div className={`${!toggled && "hidden" }  `}>
                    {
                        componentSet()
                    }
                </div>
           </div> 
  )
}

export default NewSidebar