"use client"
import React, { useEffect, useState } from 'react'
import RemotionPlayer from '../_component/RemotionPlayer'
import VideoInfo from '../_component/VideoInfo'
import { useConvex } from 'convex/react'
import { useParams } from 'next/navigation'
import { api } from '@/convex/_generated/api'
import { VideoData } from '@/app/type'
import { Id } from '@/convex/_generated/dataModel'

const PlayVideo = () => {
    const convex=useConvex();
    const {videoId}=useParams();
    const [videodata,setVideodata]=useState<VideoData | null >(null);
    
    useEffect(() => {
        const GetVideoDataById = async () => {
          try {
            if (videoId) {
              const result= await convex.query(api.videoData.VideoStatus, {
                videoId: videoId as Id<"videoData">
              });
              console.log(result);
              setVideodata(result as VideoData);
            }
          } catch (error) {
            console.error("Error fetching video data:", error);
          }
        };
      
        GetVideoDataById();
      }, [videoId, convex]);
      
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
        <div>
   <RemotionPlayer videoData={videodata} />
        </div>
        <div>
   <VideoInfo/>
        </div>
    </div>
  )
}

export default PlayVideo