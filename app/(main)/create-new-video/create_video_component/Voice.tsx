import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import React, { useState } from 'react'

interface TopicProps {
    onHandleInputChange: (fieldName: string, fieldValue:string) => void;
}
const voiceOption = [
    {
      value: "21m00Tcm4TlvDq8ikWAM", // Rachel (US)
      name: "Rachel",
      flagUrl: "https://flagcdn.com/w40/us.png",
      gender: "Female",
      language: "English"
    },
    {
      value: "AZnzlk1XvdvUeBnXmlld", // Domi (US)
      name: "Domi",
      flagUrl: "https://flagcdn.com/w40/us.png",
      gender: "Female",
      language: "English"
    },
    {
      value: "EXAVITQu4vr4xnSDxMaL", // Bella (US)
      name: "Bella",
      flagUrl: "https://flagcdn.com/w40/us.png",
      gender: "Female",
      language: "English"
    },
    {
      value: "ErXwobaYiN019PkySvjV", // Josh (US)
      name: "Josh",
      flagUrl: "https://flagcdn.com/w40/us.png",
      gender: "Male",
      language: "English"
    },
    {
      value: "MF3mGyEYCl7XYWbV9V6O", // Arnold (US)
      name: "Arnold",
      flagUrl: "https://flagcdn.com/w40/us.png",
      gender: "Male",
      language: "English"
    },
    {
      value: "pNInz6obpgDQGcFmaJgB", // Indian English Male (custom if added)
      name: "Amit",
      flagUrl: "https://flagcdn.com/w40/in.png",
      gender: "Male",
      language: "Indian English"
    },
    {
      value: "yoZ06aMxZJJ28mfd3POQ", // Indian English Female (custom if added)
      name: "Asha",
      flagUrl: "https://flagcdn.com/w40/in.png",
      gender: "Female",
      language: "Indian English"
    },
    {
      value: "TxGEqnHWrfWFTfGW9XjX", // Hindi Male
      name: "Arya",
      flagUrl: "https://flagcdn.com/w40/in.png",
      gender: "Male",
      language: "Hindi"
    },
    {
      value: "VR6AewLTigWG4xSOukaG", // Hindi Female
      name: "Swati",
      flagUrl: "https://flagcdn.com/w40/in.png",
      gender: "Female",
      language: "Hindi"
    }
  ];
  


const Voice: React.FC<TopicProps> = ({onHandleInputChange}) => {
    const [selectVoiceIndex, setSelectVoiceIndex] = useState<number | null>(null);
    
    return (
        <div className='mt-5'>
            <h2>Video Voice</h2>
            <p className='text-sm text-gray-400 mb-5'>Select voice for your video</p>
            <ScrollArea className='h-[200px] w-full'>
                <div className='grid grid-cols-2 gap-3'>
                    {voiceOption.map((voice, index) => (
                        <div
                            key={index}
                            onClick={() => {
                                setSelectVoiceIndex(index);
                                onHandleInputChange('Voice', voice.value);
                            }}
                            className={`cursor-pointer p-3 dark:bg-slate-900 dark:border-white rounded-lg hover:border 
                                ${selectVoiceIndex === index && 'border'}`}
                        >
                            <h2 className="flex items-center gap-2">
                                <Image 
                                    src={voice.flagUrl}
                                    alt={`${voice.name}'s country flag`}
                                    width={20}
                                    height={15}
                                    className="rounded-sm"
                                />
                                <span>{voice.name}</span>
                                <span className="text-xs px-2 py-0.5 rounded bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white">
  {voice.language}
</span>

                                <span className="text-sm text-gray-400">({voice.gender})</span>
                            </h2>
                        </div>
                    ))}
                </div>
            </ScrollArea>
        </div>
    );
}

export default Voice;