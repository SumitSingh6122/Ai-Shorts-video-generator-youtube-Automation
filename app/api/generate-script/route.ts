import { GenerateScript } from "@/app/config/AIModel";
import { NextRequest, NextResponse } from "next/server";

const Script_prompt=`Write a two different scripts for 30 seconds video on Topic :{topic} 
-Do not add  Scene description 
-Do not add anything in Braces , just return the plain story in text
_Do not add any music and voice over details just plane text
-Give the response in JSON format and follow the schema
{
scripts:[   
{content:''
},
]
}`
export async function POST(req:NextRequest) {
    const {topic}=await req.json();
    const Prompt=Script_prompt.replace('{topic}',topic);
    const result= await GenerateScript.sendMessage(Prompt)
    const res=result.response.text();
    return NextResponse.json(JSON.parse(res));
}