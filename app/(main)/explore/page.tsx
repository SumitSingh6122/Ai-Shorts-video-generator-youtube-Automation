"use client"
import { useAuthContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import Image from "next/image";
import Link from "next/link";

function Page() {
  const { user } = useAuthContext();

  const allVideos = useQuery(
    api.videoData.ReturnAllVideos,
    user ? { uid: user._id as Id<"user"> } : "skip"
  );
 
    if (!allVideos) {
    return <h2 className="text-xl font-semibold">Loading...</h2>;
  }

  return (
    <div>
      <h2 className="font-bold text-2xl mb-4">Explore AI Generated Content:</h2>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-5 mt-5">
        {allVideos?.map((vid, index) => (
          <div key={index}>
          <Link key={vid?._id}  href={`/play-video/${vid?._id}`}>
            <div className="relative">
              <Image
                src={vid?.image[0]}
                alt={vid?.title}
                height={500}
                width={500}
                className="w-full object-cover rounded-xl aspect-[2/3]"
              />
              <div className='absolute bottom-3 px-5 w-full '> 
    <h2 className='text-lg'>{vid?.title}</h2>
                                            
                                         </div>
            </div>
        
          </Link>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Page;
