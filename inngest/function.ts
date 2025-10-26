import axios from "axios";
import { inngest } from "./client";
import {createClient} from '@deepgram/sdk';
import { GenerateImageScript } from "@/app/config/AIModel";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";
import cloudinary from "@/lib/cloundary";


const ImagePrompt=`Generate a Image prompt of {style} style with all details for each scene for 30 seconds video :script :{script}
-Just Give specifing image prompt depends on the story line
-Do not give any text or explanation outside of JSON format
-do not give camera angle image prompt
-Follow the Following schema and return JSON data (Max 4-5 Images)
[
{  
imagePrompt:'',
sceneContent:'<Script Content>'
}
]`

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  },
);
const BASE_URL='https://aigurulab.tech';
export const GenerateVideodata=inngest.createFunction(
    {id:'generate-video-data'},
    {event:'generate-video-data'},
    async({event,step})=>{
        const {script,VideoStyle,Voice,recordId}=event.data;
        const convex=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
        

        const GenerateAudiofile = await step.run("GenerateAudiofile", async () => {
          const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${Voice}`,
            {
              text: script,
              voice_settings: {
                stability: 0.5,
                similarity_boost: 0.75,
              },
            },
            {
              responseType: 'arraybuffer',
              headers: {
                'xi-api-key': 'sk_3332ad3c84fbcd820b4219443a06fa5696b70749894ee249',
                'Content-Type': 'application/json',
              },
            }
          );
        
          const audioBuffer = Buffer.from(response.data);
        
          const uploadResp = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              {
                resource_type: 'video', // audio/video goes here
                folder: 'generated_audio',
                public_id: `audio_${Date.now()}`,
                format: 'mp3',
              },
              (error, result) => {
                if (error) return reject(error);
                resolve(result);
              }
            ).end(audioBuffer);
          });
        
          return (uploadResp as any).secure_url; // return URL
        });
        
        
        
        const GenerateCaptionFile=await step.run(
            'GenerateCaptionFile',
            async()=>{
                 const deepgram = createClient(process.env.NEXT_PUBLIC_DEEPGRAM_API_KEY);
                 const { result } = await deepgram.listen.prerecorded.transcribeUrl(
                    {
                      url:GenerateAudiofile,
                    },
                    {
                      model: "nova-3",
                    }
                  );
                  return result?.results.channels[0].alternatives[0].words;
                  
            }
        )
        const GenerateImagePrompt=await step.run(
            "GenerateImagePrompt",
            async()=>{
                const prompt=ImagePrompt.replace('{style}',VideoStyle).replace('{script}',script);
                const result=await GenerateImageScript.sendMessage(prompt)
                const resp=JSON.parse(result.response.text());
                console.log(resp);
                return resp;
               
            }
        )
        const GenerateImages=await step.run(
            
            "GenerateImages",
            async()=>{
                let images=[];
                images=await Promise.all(
                    GenerateImagePrompt.map(async(item:{imagePrompt:string})=>{
                        const result = await axios.post(BASE_URL+'/api/generate-image',
                            {
                                width: 1024,
                                height: 1024,
                                input: item?.imagePrompt,
                                model: 'sdxl',
                                aspectRatio:"1:1"
                            },
                            {
                                headers: {
                                    'x-api-key': '6f6f987c-e47e-4934-be57-0a719c859278',
                                    'Content-Type': 'application/json', 
                                },
                            })
                        
                    console.log(result) 
                    return result.data.image;
                    })
                )
                return images;

            }
        ) 

       
       

    await step.run(
            "UpdateDatabase",
            async()=>{
    const result=await convex.mutation(api.videoData.UpdateVideoData , {
        recordId:recordId,
        audioURL:GenerateAudiofile,
        captionJson:GenerateCaptionFile,
        image:GenerateImages

    });
     return result;

            }
        )

      return "Executed Succesfully!";
    }
)