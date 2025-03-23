import React from 'react'
import { option } from './Videostyle';
import Image from 'next/image';

interface props{
   FormData :{
    topic?: string;
    script?: string;
    VideoStyle?: string;
    Voice?: string;
    caption_Style?: string;
    caption_name?: string;
  }
}
const Preview:React.FC<props>=({FormData}) => {
    console.log("Preview section",FormData)
    const SelectVideoStyle=FormData && option.find((item=>item.name==FormData.VideoStyle));
  return (    
    <div>
      {SelectVideoStyle && 
    <div className='relative'>
      <h2 className='text-2xl text-center mb-2'>Preview</h2>
      <Image src={SelectVideoStyle?.image || '/'} alt='Image' height={1000} width={300} className='w-full h-[70vh] object-cover rounded-lg' />
      <h2 className={`${FormData.caption_Style} absolute bottom-8 text-center w-full`}>{FormData.caption_name}</h2>
    </div>
}
    </div>
      
  )
}

export default Preview