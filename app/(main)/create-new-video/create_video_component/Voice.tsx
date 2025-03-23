import { ScrollArea } from '@/components/ui/scroll-area';
import React, { useState } from 'react'

interface TopicProps {
    onHandleInputChange: (fieldName: string, fieldValue:string) => void;
  }
  const voiceOption=[
    {
      "value": "af_sarah",
      "name":  "us Sarah (Female)"
    },
    {
      "value": "af_sky",
      "name": "🇺🇸 Sky (Female)"
    },
    {
      "value": "am_adam",
      "name": "🇺🇸 Adam (Male)"
    },
    {
      "value": "hf_alpha",
      "name": "🇮🇳 Alpha (Female)"
    },
    {
      "value": "hf_beta",
      "name": "🇮🇳 Beta (Female)"
    }
  ]
  
const Voice:React.FC<TopicProps>= ({onHandleInputChange}) => {
  const [selectVoiceIndex,setSelectVoiceIndex]=useState<number | null>(null);
  return (
    <div className='mt-5'>
        <h2>Video Voice</h2>
        <p className='text-sm text-gray-400 mb-5'>Select voice for your video</p>
       <ScrollArea className='h-[200px] w-full'>
        <div className='grid grid-cols-2 gap-3'>
                {voiceOption.map((voice,index)=>(
                
                    <h2 key={index} onClick={()=>{
                      setSelectVoiceIndex(index);
                      onHandleInputChange('Voice',voice.value);
                    }} className={`cursor-pointer p-3 dark:bg-slate-900 dark:border-white rounded-lg hover:border 
                      ${selectVoiceIndex==index && 'border'}`}>{voice.name}</h2>
                
            ))}
        </div>
</ScrollArea>
    </div>
  )
}

export default Voice