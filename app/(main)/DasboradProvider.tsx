import React, { ReactNode } from 'react'
import { SidebarProvider} from "@/components/ui/sidebar"
import { AppSidebar } from './_component/AppSidebar'
import AppHeader from './_component/AppHeader'
 interface props{
    children:ReactNode
 }
const DashboardProvider:React.FC<props>= ({children}) => {
  return (
    
     <SidebarProvider> 
      <AppSidebar/>
      <div className='w-full'>
        <AppHeader/>
        <div className='p-10 '>
        {children}
        </div>
        
        </div>
       
       </SidebarProvider>
    
  )
}

export default DashboardProvider;