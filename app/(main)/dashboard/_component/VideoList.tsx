"use client";

import { useAuthContext } from '@/app/provider';
import { Button } from '@/components/ui/button';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useConvex, useMutation, useQuery } from 'convex/react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import moment from 'moment';
import { RefreshCcw } from 'lucide-react';

const VideoList = () => {
    
    const { user } = useAuthContext();
    const refreshVideos = useMutation(api.videoData.GetUserVideos);
    const videoList = useQuery(api.videoData.GetUserVideos, user ? { uid: user._id as Id<"user"> } : "skip");
    const ispendingSatus=videoList?.find((item)=>item.status=='pending');
     const convex=useConvex();
    const GetPendingVideoStatus=(ispendingSatus)=>{
    const intervalId=setInterval(async()=>{
      const result=await convex.query(api.videoData.VideoStatus,
        {
            videoId:ispendingSatus?._id
        })
        if(result?.status=='completed'){
       clearInterval(intervalId);
       refreshVideos();
       
        }
      
    },5000)
    }
    if(ispendingSatus){GetPendingVideoStatus(ispendingSatus);}

    return (
        <div>
            {videoList?.length ==0  ? 
                <div className='flex flex-col items-center justify-center mt-28 gap-5 border border-dashed p-5 rounded-xl py-16'>
                    <Image src={'/logo.svg'} alt='Logo' height={60} width={60} /> 
                    <h2 className='text-gray-400 text-lg'>You don&apos;t have any videos created.</h2>
                    <Link href={'/create-new-video'}>
                        <Button>+ Create New Video</Button>
                    </Link>
                </div> :<div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-10'>
                    { videoList?.map((vid,index)=>(  
                       <Link key={index} href={'/play-video/'+vid?._id}>
                        <div className='relative' >
                           {vid.status=='completed'  ? 
                            <Image src={vid.image[0]} alt={vid.title} height={500} width={500} 
                            className='w-full object-cover rounded-xl aspect-[2/3]  '/> :
                            <div className='aspect-[2/3] p-5 w-full rounded-xl bg-slate-900 flex items-center justify-center gap-2'>
                                <RefreshCcw  className='animate-spin'/>
                                <h2>Processing...</h2>
                            </div>


                           }
                            <div className='absolute bottom-3 px-5 w-full '> 
                                <h2 className='text-sm'>{vid?.title}</h2>
                                <h2>{moment(vid._creationTime).fromNow()}</h2>
                            </div>
                        </div>
                        </Link>
                    ))

                    }
                </div>
            }
        </div>
    );
};

export default VideoList;
