"use client";
import { VideoData } from '@/app/type';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ArrowLeft, DownloadIcon, LucideYoutube } from 'lucide-react'
import Link from 'next/link';
import React, { useState } from 'react'


interface VideoDataType {
  videoData: VideoData | null;
}
const VideoInfo:React.FC<VideoDataType> = ({videoData}) => {

  const [loading, setLoading] = useState(false);
  const [downloadLoading, setDownloadLoading] = useState(false);

  const handleDownload = async () => {
    if (!videoData?.DownloadURL) {
      alert('Video is not ready for download yet. Please wait for rendering to complete.');
      return;
    }

    try {
      setDownloadLoading(true);
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = videoData.DownloadURL;
      link.download = `${videoData.title}.mp4`; // Set the filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Failed to download video');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleUploadToYouTube = async () => {
    if (!videoData) return alert('No video data available');

    try {
      setLoading(true);
      const response = await axios.post('/api/upload-to-youtube', {
        title: videoData.title,
        description: videoData.script,
        videoUrl: videoData.audioURL,
      });

      alert(response.data.message);
    } catch (error) {
      console.error('Upload failed:', error);
      
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='p-5 border rounded-xl '>
      <Link href={'/dashboard'}>
      <h2 className='flex gap-2 items-center'><ArrowLeft/>Back to Dashboard</h2>
      </Link>
      <div className='flex flex-col gap-3'>
      <h2 className='mt-5'>Project Name:  {videoData?.title}</h2>
      <p>Video Script :  {videoData?.script}</p>
      <h2>Video Style :  {videoData?.videoStyle}</h2>
      <Button 
        onClick={handleDownload}
        disabled={downloadLoading || !videoData?.DownloadURL}
        className='w-full flex gap-2 font-semibold'
      >
        <DownloadIcon/> 
        {!videoData?.DownloadURL ? 'Video is still rendering. Please check back shortly.' : 'Export & Download'}
      </Button>
      <Button onClick={handleUploadToYouTube} disabled={loading} className='w-full flex gap-2 text-black font-semibold'>
          <LucideYoutube className='text-[40px] text-red-500' /> {loading ? 'Uploading...' : 'Upload on YouTube'}
        </Button>
        </div>
    </div>
  )
}

export default VideoInfo