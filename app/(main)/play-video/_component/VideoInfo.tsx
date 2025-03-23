import { VideoData } from '@/app/type';
import { Button } from '@/components/ui/button';
import { ArrowLeft, DownloadIcon } from 'lucide-react'
import Link from 'next/link';
import React from 'react'


interface VideoDataType {
  videoData: VideoData | null;
}
const VideoInfo:React.FC<VideoDataType> = ({videoData}) => {
  return (
    <div className='p-5 border rounded-xl '>
      <Link href={'/dashboard'}>
      <h2 className='flex gap-2 items-center'><ArrowLeft/>Back to Dashboard</h2>
      </Link>
      <div className='flex flex-col gap-3'>
      <h2 className='mt-5'>Project Name:  {videoData?.title}</h2>
      <p>Video Script :  {videoData?.script}</p>
      <h2>Video Style :  {videoData?.videoStyle}</h2>
      <Button className='w-full flex gap-2'><DownloadIcon/> Export &nbsp;  &  &nbsp; Download</Button>
      </div>
    </div>
  )
}

export default VideoInfo