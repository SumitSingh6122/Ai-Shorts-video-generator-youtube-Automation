import React from 'react'
import VideoList from './_component/VideoList'


export default function Dashboard(){
  return (
    <div> 
      <h2 className=' font-bold text-3xl'>My Videos</h2>
        <VideoList/>
      </div>
  )
}
