import React, { useState } from 'react'
import '@/app/styles/caption-styles.css'

const options = [
    {
      name: "Youtuber",
      style: "youtuber",
    },
    {
      name: "Supreme",
      style: "supreme",
    },
    {
      name: "Neon",
      style: "neon",
    },
    {
      name: "Glitch",
      style: "glitch",
    },
    {
      name: "Fire",
      style: "fire",
    },
    {
      name: "Cyberpunk",
      style: "cyberpunk",
    },
    {
      name: "Shadow",
      style: "shadow",
    },
    {
      name: "Retro",
      style: "retro",
    },
    {
      name: "Ghost",
      style: "ghost",
    },
    {
      name: "Bubble",
      style: "bubble",
    },
    {
      name: "Vibrant",
      style: "vibrant",
    },
    {
      name: "Dark Mode",
      style: "dark-mode",
    },
    {
      name: "Cartoon",
      style: "cartoon",
    },
    {
      name: "Metallic",
      style: "metallic",
    },
    {
      name: "Electric",
      style: "electric",
    },
  ];
  
  interface TopicProps {
    onHandleInputChange: (fieldName: string, fieldValue:string) => void;
  }
  
const Caption:React.FC<TopicProps>= ({onHandleInputChange}) => {
    const [selctCaptionIndex,SetcaptionIndex]=useState<number | null>(null);
  return (
    <div className='mt-5'>
        <h2>Video Caption</h2>
        <p className='text-sm text-gray-400 mb-4'>Select caption Style</p>
        <div className='flex flex-wrap gap-4'>
            {
                options.map((caption,index)=>(
                    <div key={index} className={`p-2 hover:border border-gray-300 cursor-pointer dark:bg-gray-900 rounded-lg ${selctCaptionIndex==index && 'border'}`}
                    onClick={()=>{
                        SetcaptionIndex(index);
                        onHandleInputChange('caption_Style',caption.style);
                        onHandleInputChange('caption_name',caption.name);
                    }}>
                        <h2 className={caption.style}>{caption.name}</h2>
                    </div>
                ))
            }
        </div>
    </div>
  )
}

export default Caption