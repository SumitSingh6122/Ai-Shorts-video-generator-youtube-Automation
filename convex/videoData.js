import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateVideoData=mutation({
    args:{
               title:v.string(),
                topic:v.string(),
                script:v.string(),
                videoStyle:v.string(),
                caption_name:v.string(),
                caption_Style:v.string(),
                Voice:v.string(),
                uid:v.id('user'),
                createdBy:v.string(),
                credits:v.number()
    },
    handler:async(ctx,args)=>{
   const result=await ctx.db.insert('videoData',{
    title:args.title,
    topic:args.topic,
    script:args.script,
   videoStyle:args.videoStyle,
    caption_name:args.caption_name,
    caption_Style:args.caption_Style,
    Voice:args.Voice,
    uid:args.uid,
    createdBy:args.createdBy,
    status:'pending'
    
   })
   await ctx.db.patch(args.uid,{
    credits:(args.credits)-1
   })
   return result;
    }
})
export const UpdateVideoData=mutation({

    args:{
        recordId:v.id('videoData'),
        image:v.any(),
        captionJson:v.any(),
        audioURL:v.any(),
      
        
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.patch(args.recordId,{
            audioURL:args.audioURL,
            captionJson:args.captionJson,
            image:args.image,
            
            status:"completed"
        });
        return result;
    }
})
export const GetUserVideos=query({
    args:{
        uid:v.id('user')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.query('videoData').filter(q=>q.eq(q.field('uid'),args.uid)).order('desc').collect();
        return result;
    }
})
export const VideoStatus=query({
    args:{
        videoId:v.id('videoData')
    },
    handler:async(ctx,args)=>{
        const result=await ctx.db.get(args.videoId);
        return result;
    }
})
export const GetTotalVideos=query(async({db})=>{
   return await db.query('videoData').collect();
});
export const saveVideoDownloadUrl = mutation({
    args: {
      videoId: v.id("videoData"),
      url: v.string(),
    },
    handler: async (ctx, args) => {
      await ctx.db.patch(args.videoId, {
        DowloadURL: args.url,
      });
    },
  });