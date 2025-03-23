import Image from 'next/image';
import React, { useState } from 'react'


export const option=[
    {
        name:'Realistic',
        image:'/realistic.webp'
    },
    {
        name:'Cinematic',
        image:'/cinematic.webp'
    },
    {
        name:'Cartoon',
        image:'/3d.webp'
    },
    {
        name:'Watercolor',
        image:'/watercolor.webp'
    },
    {
        name:'Cyberpunk',
        image:'/cyberpunk.webp'
    }
    ,{
        name:'GTA',
        image:'/gta.webp'
    },{
        name:'Anime',
        image:'/anim.webp'
    }
]

interface TopicProps {
    onHandleInputChange: (fieldName: string, fieldValue:string) => void;
  }
const Videostyle:React.FC<TopicProps>= ({onHandleInputChange}) => {
    const [selectedStyle,setSelectedstyle]=useState('');
  return (
    <div>
        <h2 className='mt-5'>Video Style</h2>
        <p className='text-sm text-gray-400 mb-5'>Select video style</p>
        <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2'>{  option.map((item,index)=>(
            <div className='relative' key={index} 
            onClick={()=>{setSelectedstyle(item.name);
                onHandleInputChange("VideoStyle",item.name)
            }}>
                <Image src={item.image} alt={item.name} width={500} height={120}
                 className={`object-cover h-[70px] md:h-[90px] xl:h-[160px] rounded-lg p-1 hover:border border-gray-300 cursor-pointer
                 ${item.name==selectedStyle && 'border'}`}/>

                 <h2 className='absolute text-center bottom-1 w-full'>{item.name}</h2>
            </div> 
        ))
            
            }</div>
    </div>
  )
}

export default Videostyle