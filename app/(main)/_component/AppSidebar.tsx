"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Gem, HomeIcon, LucideFileVideo, Search, ShieldCheck, WalletCards, Youtube } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export function AppSidebar() {
  const MenuItem = [
    { title: "Home", url: "/dashboard", icon: HomeIcon },
    { title: "Create New Video", url: "/create-new-video", icon: LucideFileVideo },
    { title: "YouTube Upload", url: "/youtube-upload", icon: Youtube }, // Add this line
    { title: "Explore", url: "/explore", icon: Search },
    { title: "Billing", url: "/billing", icon: WalletCards },
  ];

  const path = usePathname();
  const { user } = useAuthContext(); 
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user,router]); 

  return (
    <Sidebar>
      <SidebarHeader>
        <div>
          <div className="flex items-center gap-3 w-full justify-center mt-5">
            <Image src={"/logo.svg"} alt="userImage" width={40} height={40} className="rounded-full" />
            <h2 className="font-bold text-2xl">Video Gen AI</h2>
          </div>
          <h2 className="text-lg text-gray-300 text-center mt-3">AI Shorts Video Generator</h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="mx-5 mt-10">
            <Link href={'/create-new-video'}>
            <Button className="w-full">+ Create New Video</Button>
            </Link>
          </div>
          <SidebarMenu>
            {MenuItem.map((item, index) => (
              <SidebarMenuItem key={index} className="mt-3 mx-5">
                <SidebarMenuButton isActive={path === item.url} className="p-5">
                  <Link href={item.url} className="flex items-center gap-4 p-3">
                    <item.icon />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          { user?.role=="admin" &&
                 <div className="mx-5 mt-10">
                 <Link href={'/admin'}>
                 <Button className="w-full "><ShieldCheck className="ml-2 h-5 w-5" /> Admin Dashboard</Button>
                 </Link>
               </div>
          }
      
        </SidebarGroup>
        <SidebarGroup />
        
      </SidebarContent>
      <SidebarFooter>
        <div className="p-5 border rounded-lg bg-gray-800 mb-5">
          <div className="flex items-center justify-center gap-3">
            <Gem className="text-gray-400" />
            <h2 className="text-gray-400">{user?.credits} Credit Left</h2>
          </div>
          <Button className="w-full mt-3">Buy More Credits</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
