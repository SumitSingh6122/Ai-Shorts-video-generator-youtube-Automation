import { Button } from '@/components/ui/button';
import React from 'react'
import Authentication from './Authentication';

const Hero = () => {
  return (
    <div className='p-10 flex  items-center flex-col mt-24 md:px-20 lg:mx-36 xl:px-58'>
<h2 className='font-bold text-6xl text-center'>Ai Youtube Shorts Video Generator</h2>
<p className='mt-4 text-xl text-center text-gray-500'>🚀 Create AI-Powered Shorts in Seconds! 🎬✨
Turn your ideas into stunning, high-quality short videos effortlessly!
 ⚡ Just enter your text, and our AI Shorts Generator will transform it into eye-catching content—perfect for social media, promotions, and more.
  🎨🎶 Start creating now! 🎥🔥</p>
  <div className='mt-7 flex gap-8'>
  <Button size="lg" variant='secondary' >Get Started</Button>
  <Authentication><Button size="lg">Get Started</Button></Authentication></div>
    

    </div>
  )
}

export default Hero;