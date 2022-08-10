import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router';
import {FaCloudUploadAlt} from 'react-icons/fa'
import {MdDelete } from 'react-icons/md'
import axios from 'axios';
import { SanityAssetDocument } from '@sanity/client';
import useAuthStore from '../store/authStore';
import { client } from '../utils/client'
import Image from 'next/image';
import { GoogleLogin } from '@react-oauth/google';
import { createOrGetUser } from '../utils';

function Upload() {
    const {userProfile, addUser, removeUser} = useAuthStore();
    
    const [WrongFileType, setWrongFileType] = useState(false);
    const [isLoading, setisLoading] = useState(false); 
    const [mediaAsset, setmediaAsset] = useState<SanityAssetDocument | undefined>(); 


    const uploadMedia = async (e:any) =>{
        const selectedFile= e.target.files[0];
        const fileTypes = [ 'video/mp4', 'video/webm' , 'video/ogg', 'image/png', 'image/jpg']

        if (fileTypes.includes(selectedFile.type)) { 
            setisLoading(true);
            client.assets.upload('file', selectedFile,{
                contentType: selectedFile.type,
                filename: selectedFile.name
            }).then((data)=>{
                setmediaAsset(data); 
                setisLoading(false);
            })

        }else{
            setisLoading(false);
            setWrongFileType(true);
        }
    }
   

  return (

    <>
    {userProfile ? (<div className='flex w-full p-5'>
        <div className=' border-gray-600 border-2 py-4 px-2 rounded-lg'>
            <div>
                <div>
                    <p className='text-2xl font-bold '>Upload media</p>
                    <p className='text-md text-gray-400 mt-1'>Post  Media to your account</p>
                </div>
                <div className='border-dashed rounded-xl border-4 border-gray-200 flex flex-col justify-center hover:animate-pulse hover:bg-gray-100 items-center cursor-pointer outline-none mt-10 w-[260px] h-[460px] hover:border-red-300'>
                    {isLoading ? (
                        <p>Uploading...</p>
                    ): (
                        <div>
                            {mediaAsset ? (
                                <div> 

                                   { 
                                    mediaAsset.extension=="jpg"|| mediaAsset.extension=="png" ?
                                    (
                                        <>
                                        <Image width={"180%"} height={"100%"} src={mediaAsset.url} className='rounded-xl   mt-16 bg-slate-600 '></Image>
                                        </>
                                        
                                    ):
                                    (
                                        <video src={mediaAsset.url} loop controls className='rounded-xl h-[450px] bg-black '/>
                                    )
                                   }
  

                                </div>
                            )
                            :
                            (
                                <label className='cursor-pointer '>
                                    <div className='flex flex-col justify-center h-full items-center'>
                                        <div className='flex flex-col justify-center h-full items-center'>
                                         <p><FaCloudUploadAlt className='text-6xl text-gray-400'/></p>
                                         <p className='text-xl font-semibold'></p>
                                        </div>
                                        <p>
                                            Media cannot be more than 2GB
                                        </p>
                                        <p className='bg-[#f51997] font-medium p-2 w-52 outline-none rounded text-center mt-10' >Select media.....</p>
                                    </div>
                                    <input 
                                        type="file"
                                        name="upload-media"
                                        className='w-0 h-0'
                                        onChange={ uploadMedia } />
                                </label>
                                
                            )

                            }
                        </div>
                    )

                    }
                    
                </div>
            </div>
        </div>
    </div>): 
    (
        <div className='flex items-center'>
            <GoogleLogin onSuccess={(response)=>createOrGetUser(response,addUser)} onError={()=>console.log('error')} />
        </div>
    )}
    </>
  )
}

export default Upload