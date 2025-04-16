import { ScrollArea } from '@/components/ui/scroll-area';
import Image from 'next/image';
import React, { useState } from 'react'

interface TopicProps {
    onHandleInputChange: (fieldName: string, fieldValue:string) => void;
}

const voiceOption = [
    {
      "value": "af_sarah",
      "name": "Sarah",
      "flagUrl": "https://flagcdn.com/w40/us.png",  // Using flag CDN
      "gender": "Female"
    },
    {
      "value": "af_sky",
      "name": "Sky",
      "flagUrl": "https://flagcdn.com/w40/us.png",
      "gender": "Female"
    },
    {
      "value": "am_adam",
      "name": "Adam",
      "flagUrl": "https://flagcdn.com/w40/us.png",
      "gender": "Male"
    },
    {
      "value": "hf_alpha",
      "name": "Alpha",
      "flagUrl": "https://flagcdn.com/w40/in.png",
      "gender": "Female"
    },
    {
      "value": "hf_beta",
      "name": "Beta",
      "flagUrl": "https://flagcdn.com/w40/in.png",
      "gender": "Female"
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