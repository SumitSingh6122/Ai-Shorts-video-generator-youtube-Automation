import { inngest } from "@/inngest/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const formdata=await req.json();
 const result= await inngest.send({
        name:'generate-video-data',
        data:{
            ...formdata
        }
    });

    return NextResponse.json({
        result:result
    })
    
}