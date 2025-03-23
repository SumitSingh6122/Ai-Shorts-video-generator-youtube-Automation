import React, { useState } from 'react'
const options = [
    {
      name: "Youtuber",
      style: "text-yellow-400 text-4xl font-extrabold uppercase tracking-wide drop-shadow-md",
    },
    {
      name: "Supreme",
      style: "text-white text-4xl font-bold italic drop-shadow-2xl  px-3 py-1 rounded",
    },
    {
      name: "Neon",
      style: "text-green-500 text-4xl font-extrabold uppercase tracking-widest shadow-lg neon-glow",
    },
    {
      name: "Glitch",
      style: "text-pink-500 text-4xl font-extrabold uppercase tracking-wide skew-x-3 animate-pulse",
    },
    {
      name: "Fire",
      style: "text-red-500 text-4xl font-extrabold uppercase tracking-wider ",
    },
    {
      name: "Cyberpunk",
      style: "text-cyan-400 text-4xl font-extrabold tracking-widest  p-2  neon-glow",
    },
    {
      name: "Shadow",
      style: "text-white-800 text-4xl font-bold shadow-2xl  px-2 py-1 rounded-md",
    },
    {
      name: "Retro",
      style: "text-orange-500 text-4xl font-extrabold italic drop-shadow-lg  px-3 py-1 ",
    },
    {
      name: "Ghost",
      style: "text-white text-4xl font-light opacity-75 italic bg-transparent backdrop-blur-sm",
    },
    {
      name: "Bubble",
      style: "text-blue-500 text-4xl font-bold rounded-full px-4 py-2 shadow-lg",
    },
    {
      name: "Vibrant",
      style: "text-purple-700 text-4xl font-extrabold uppercase tracking-wide drop-shadow-md   ",
    },
    {
      name: "Dark Mode",
      style: "text-white text-4xl font-bold  p-3 rounded-md shadow-xl ",
    },
    {
      name: "Cartoon",
      style: "text-yellow-500 text-4xl font-extrabold   px-3 py-1  shadow-md",
    },
    {
      name: "Metallic",
      style: "text-gray-300 text-4xl font-extrabold uppercase tracking-wider  shadow-xl",
    },
    {
      name: "Electric",
      style: "text-blue-400 text-4xl font-extrabold uppercase tracking-widest animate-pulse  px-3 py-1 ",
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