// pages/api/save-video-url.ts
import { NextRequest, NextResponse } from "next/server";
import { api } from "@/convex/_generated/api";
import { ConvexHttpClient } from "convex/browser"; // HTTP client for server-side
import { getDeploymentUrl } from "@/utils/getDeploymentUrl";

const convex = new ConvexHttpClient(getDeploymentUrl());

export async function POST(req: NextRequest) {
  try {
    const { videoId, url } = await req.json();

    if (!videoId || !url) {
      return NextResponse.json(
        { error: "Missing parameters" },
        { status: 400 }
      );
    }

    // Save the video URL to Convex
    await convex.mutation(api.videoData.saveVideoDownloadUrl, {
      videoId,
      url,
    });

    // Log the successful save
    console.log(`Video URL saved for video ID: ${videoId}`);

    return NextResponse.json({ 
      success: true,
      message: "Video URL saved successfully" 
    });
  } catch (err) {
    console.error("Error saving video URL:", err);
    return NextResponse.json(
      { error: "Internal Server Error", details: err },
      { status: 500 }
    );
  }
}
