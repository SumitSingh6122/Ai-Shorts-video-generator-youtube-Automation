"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon, Plus, SparkleIcon } from 'lucide-react';
import axios from 'axios'
const suggestions = [
    "Historic Story",
    "Kids' Story",
    "Movie Stories",
    "AI Innovations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakthroughs",
    "True Crime Stories",
    "Fantasy Adventures",
    "Science Experiments",
    "Motivational Stories"
  ];
  
  interface TopicProps {
    onHandleInputChange: (fieldName: string, fieldValue:string) => void;
  }
  
  const Topic: React.FC<TopicProps> = ({onHandleInputChange }) => {
  
    const [Topic,setTopic]=useState('');
    const [customScriptVisible,setCustomScriptVisible]=useState(false);
    const [script,setScript]=useState([]);
    const [SelectScriptIndex,setSelectScriptIndex]=useState<number | null>(null);
    const [loading,setLoading]=useState(false);

    const GenerateScript=async()=>{
      setLoading(true);
      setSelectScriptIndex(null);
      try {
        const result= await axios.post('/api/generate-script',{
          topic:Topic
       })
       console.log(result.data);
       setScript(result.data.scripts);
      } catch (error) {
        console.log(error)
      } finally{
        setLoading(false);
      }
     
     
    }
  return (
    <div>
     <h2 className='mb-2'>Project Title</h2>
     <Input placeholder='Enter Project title...' onChange={(e)=>onHandleInputChange('title',e.target.value)} />
     <div className='mt-5'>
     <h2>Video Topic</h2>
     <p  className='text-sm text-gray-600'>Select Topic for Video</p>
     <Tabs defaultValue="account" className="w-full mt-2">
  <TabsList>
    <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
    <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
  </TabsList>
  <TabsContent value="suggestion">
    <div>
        {suggestions.map((suggetion,index)=>(
           <Button className={`m-1 ${suggetion==Topic && 'bg-secondary'}`} variant="outline" key={index} onClick={()=>{setTopic(suggetion);
            onHandleInputChange('topic',suggetion)
           }}>{suggetion}</Button>
        ))}
    </div>
  </TabsContent>
  <TabsContent value="your_topic"><div>
    <h2>Enter Your Own Topic</h2>
    <Textarea className='mt-2' placeholder='Enter your topic...'  
    onChange={(e)=>onHandleInputChange('topic',e.target.value)}
    />
    </div></TabsContent>
</Tabs>
  <div>
    {script.length>0 && 
    <div className='mt-3'><h2>Select Script</h2>
    <div className='flex-col mt-1'>
      
    {script.map((item:{content:string},index)=>(
      <div className={`p-3 border cursor-pointer rounded-lg mt-3 ${SelectScriptIndex ==index && 'border-white bg-secondary'} `} 
      onClick={()=>{setSelectScriptIndex(index);
        onHandleInputChange('script',item.content);
      }}
      key={index}>
        <h2 className='line-clamp-3 text-sm text-gray-300'>{item?.content}</h2>
      </div>
    ))

    }
    </div>
    </div>}
  </div>
     </div>
     <div className='flex gap-3'>
     <Button className='mt-3 ' 
     disabled={loading}
     onClick={GenerateScript} size='sm'> {loading ?<Loader2Icon className='animate-spin' />:<SparkleIcon/>} Generate Script</Button>
     <Button variant='secondary' onClick={()=>setCustomScriptVisible((prev)=>!prev)} className='mt-3' size='sm'><Plus/> Add your Own Script</Button></div>
     {customScriptVisible &&  <Textarea className='mt-4' onChange={(e)=>onHandleInputChange('script',e.target.value)} placeholder='Write here , your own Script...' /> }
    
    </div>
  )
}

export default Topic