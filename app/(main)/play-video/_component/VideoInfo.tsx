"use client";
import { VideoData } from '@/app/type';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ArrowLeft, DownloadIcon, LucideYoutube } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';

import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'react-toastify';


interface VideoDataType {
  videoData: VideoData & { _id: Id<'videoData'> }; // Include Convex ID
}

const VideoInfo: React.FC<VideoDataType> = ({ videoData }) => {
  
  const [downloadLoading, setDownloadLoading] = useState(false);
  



  const handleDownload = async () => {
    if (!videoData) {
      toast.error('Missing video data. Cannot start rendering.');
      return;
    }

    try {
      setDownloadLoading(true);

      const response = await axios.post('/api/render-video', {
        audioURL: videoData.audioURL,
        captions: videoData.captionJson,
        images: videoData.image,
        captionStyle: videoData.caption_Style || {
          fontSize: '32px',
          color: 'yellow',
          fontWeight: 'bold',
        },
        videoId:videoData._id, 
      });

      toast.success('Rendering started! You will be notified when the video is ready.');

      console.log('Render API response:', response.data);
    } catch (error) {
      console.error('Failed to trigger render:', error);
      toast.error('Failed to start rendering.');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleUploadToYouTube = async () => {
   
  };

  return (
    <div className="p-5 border rounded-xl">
      <Link href="/dashboard">
        <h2 className="flex gap-2 items-center">
          <ArrowLeft /> Back to Dashboard
        </h2>
      </Link>
      <div className="flex flex-col gap-3">
        <h2 className="mt-5">Project Name: {videoData?.title}</h2>
        <p>Video Script: {videoData?.script}</p>
        <h2>Video Style: {videoData?.videoStyle}</h2>
       
        <Button
          onClick={handleDownload}
          disabled={downloadLoading}
          className="w-full flex gap-2 font-semibold"
        >
          <DownloadIcon />
          {downloadLoading ? 'Rendering...' : 'Export & Download'}
        </Button>
        <Button
          onClick={handleUploadToYouTube}
          className="w-full flex gap-2 text-black font-semibold"
        >
          <LucideYoutube className="text-[40px] text-red-500" />
         Upload on YouTube
        </Button>
      </div>
    </div>
  );
};

export default VideoInfo;