import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { Content } from '../types'
import Image from 'next/image'
import Link from 'next/link'
import { HiVolumeUp, HiVolumeOff} from 'react-icons/hi'
import { BsFillPlayFill, BsFillPauseFill, BsPlay } from 'react-icons/bs'
import {GoVerified} from 'react-icons/go'
import {NextPage} from 'next' 


interface IProps {
  post: Content;
} 

const Card:NextPage<IProps> = ({post}) => {
  const [isHover, setisHover] = useState(false)
  const [playing, setplaying] = useState(false)
  const [isMuted, setisMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null);
  const onVideoPress =()=>{
    if(playing){
      videoRef?.current?.pause();
      setplaying(false);

    }else{
      videoRef?.current?.play();
      setplaying(true);
    }
  }
  const muteToggle = () =>{
    let vid=videoRef.current;
    if (vid!=undefined &&isMuted) {
      vid.muted=false;
      setisMuted(vid.muted);
    } else {
      if (vid!=undefined && !isMuted) {
        vid.muted=true;
        setisMuted(vid.muted);
      }
    }
  }

  return (
    <div className='flex flex-col border-b-2   border-gray-900 pb-6'>
      <div className='flex flex-col border-2 bg-slate-400  rounded-xl max-w-5xl  border-gray-900 pb-6'>
      <div className=' flex gap-3 p-2 cursor-pointer font-semibold rounded'>
        <div className=' md:w-16 md:h-16 w-10 h-10'>
          <Link
          href="/">
            <>
            <Image width={62} height={62} className='rounded-full' alt='profile photo' layout='responsive' src={post.postedBy.image}/></>
          </Link>
        </div>
        <div>
          <Link href="/">
            <div className='flex items-center gap-2'>
              <p className='flex items-center gap-2 md:text-md text-primary font-bold '>{post.postedBy.userName} {` `}</p>
              <p className='capitalize font-medium text-xs md:block text-gray-500 hidden '>{post.postedBy.userName}</p>
              <GoVerified className='text-blue-400 text-md'/>
            </div>
          </Link>
        </div>
      </div>
      <div className='px-10'>
        <p className='font-bold text-xl mb-2'>{post.caption}</p>
      </div>
      <div className='border-gray-700 lg:ml-20 flex gap-4 relative'>


        { 
        post.type=="mp4" ||  post.type=="webm" ? (
          <div onMouseEnter={()=>setisHover(true)}
            onMouseLeave={()=>()=>setisHover(false)} className='rounded-3xl'>
          <Link href={`/`}>
            <video onClick={onVideoPress} ref={videoRef} loop className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530] w-[300px] rounded cursor-pointer bg-gray-100  ' src={post.content.asset.url}></video>
          </Link>
          {isHover && (
            <div className='absolute bottom-6 cursor-pointer left-8 md:left-14 lg:left-0 flex gap-10 justify-between w-[100px] md:w-[50px] p-3 '>
              {playing ? (
                <button onClick={onVideoPress}>
                  <BsFillPauseFill className='sm:block text-black lg:text-4xl'/>
                </button>
              ): ( 
                  <button onClick={onVideoPress}>
                    <BsFillPlayFill className='sm:block text-black lg:text-4xl'/>
                  </button>
              )}
              {isMuted ? (
                <button>
                  <HiVolumeOff onClick={ muteToggle } className=' sm:block md:text-lg text-black lg:text-4xl'/>
                </button>
              ): (
                <button>
                  <HiVolumeUp  onClick={ muteToggle } className='sm:block md:text-lg text-black lg:text-4xl'/>
                </button>
              )}
            </div>
          )}
        </div>
        )
        :
        (
          <div>
            <Image width={300} height={300} className='lg:w-[600px] h-[300px] md:h-[400px] lg:h-[530] w-[300px] rounded cursor-pointer bg-gray-100' src={post.content.asset.url} />
          </div>
        )

        }



      </div>
      </div>
    </div>
  )
}

export default Card