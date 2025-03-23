"use client"
import React, { ReactNode } from 'react'
import { ConvexProvider, ConvexReactClient } from "convex/react";
import Provider from './provider';

interface props{
  children:ReactNode
}
const ConvexClientProvider :React.FC<props > =({children}) => {
   const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
  return (
     <ConvexProvider client={convex}>
      <Provider>{children}</Provider>
      
        </ConvexProvider>
  )
}

export default ConvexClientProvider