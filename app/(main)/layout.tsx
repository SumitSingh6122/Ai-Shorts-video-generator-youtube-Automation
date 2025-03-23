import React, { ReactNode } from 'react'
import DashboardProvider from './DasboradProvider'
 interface props{
    children:ReactNode
 }
const DashboardLayout:React.FC<props>= ({children}) => {
  return (
   
    <DashboardProvider>{children}</DashboardProvider>
    
  )
}

export default DashboardLayout