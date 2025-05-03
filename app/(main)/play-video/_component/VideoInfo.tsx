"use client";
import { VideoData } from '@/app/type';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ArrowLeft, DownloadIcon, LucideYoutube, Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useState } from 'react';
import { Id } from '@/convex/_generated/dataModel';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

interface VideoDataType {
  videoData: VideoData & { _id: Id<'videoData'>; DownloadURL?: string };
}

const VideoInfo: React.FC<VideoDataType> = ({ videoData }) => {
  const [isRendering, setIsRendering] = useState(false);
  const navigate=useRouter()
  const handleDownload = async () => {
    if (!videoData) {
      toast.error('Missing video data. Cannot start rendering.');
      return;
    }

    try {
      setIsRendering(true);
  
      const response = await axios.post('/api/render-video', {
        audioURL: videoData.audioURL,
        captions: videoData.captionJson,
        images: videoData.image,
        caption_Style: videoData.caption_Style || '',
        videoId: videoData._id,
      });

      toast.success('Rendering started! The download option will appear when ready.');
      console.log('Render API response:', response.data);
    } catch (error) {
      console.error('Failed to trigger render:', error);
      toast.error('Failed to start rendering.');
    } finally {
      if(videoData?.DownloadURL){
        setIsRendering(false);
      }
    }
  };

  const handleDownloadVideo = () => {
    if (!videoData.DownloadURL) return;
    
    const link = document.createElement('a');
    link.href = videoData.DownloadURL;
    link.download = `${videoData.title || 'video'}.mp4`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
        
        {videoData?.DownloadURL ? (
          <Button
            onClick={handleDownloadVideo}
            className="w-full flex gap-2 font-semibold"
          >
            <DownloadIcon />
            Download Video
          </Button>
        ) : (
          <Button
            onClick={handleDownload}
            disabled={isRendering}
            className="w-full flex gap-2 font-semibold"
          >
            {isRendering ? (
              <Loader2 className="animate-spin" />
            ) : (
              <DownloadIcon />
            )}
            {isRendering ? 'Starting Render...' : 'Export & Download'}
          </Button>
        )}

        <Button
          onClick={() =>navigate.push('/youtube-upload')}
          
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