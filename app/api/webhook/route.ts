import { NextRequest, NextResponse } from 'next/server';
import { ConvexHttpClient } from 'convex/browser';
import { api } from '@/convex/_generated/api';

// Use the correct environment variable
const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || 
                 "https://dynamic-magpie-866.convex.cloud";

if (!convexUrl) {
  console.error('CONVEX_URL environment variable is not set');
  throw new Error('CONVEX_URL is not configured');
}

const convex = new ConvexHttpClient(convexUrl);

export async function POST(request: NextRequest) {
  try {
    console.log('Initializing webhook handler');
    const payload = await request.json();
    console.log('Received payload:', payload);

    const { video_url, videoId } = payload;
    
    if (!video_url || !videoId) {
      console.error('Missing parameters:', { video_url, videoId });
      return NextResponse.json(
        { error: 'Missing video URL or video ID' },
        { status: 400 }
      );
    }

    // URL validation
    try {
      new URL(video_url);
    } catch (e) {
      console.error('Invalid URL:', video_url ,e);
      return NextResponse.json(
        { error: 'Invalid video URL format ' },
        { status: 400 }
      );
    }

    console.log('Processing video:', { videoId, video_url });

    try {
      console.log('Querying video status...');
      const videoExists = await convex.query(api.videoData.VideoStatus, {
        videoId: videoId
      });
      
      if (!videoExists) {
        console.error('Video not found in database');
        return NextResponse.json(
          { error: 'Video record not found' },
          { status: 404 }
        );
      }

      console.log('Saving download URL...');
      await convex.mutation(api.videoData.saveVideoDownloadUrl, {
        videoId,
        url: video_url,
      });

      console.log('Successfully updated video with URL');
      return NextResponse.json({
        success: true,
        message: 'Video URL saved successfully',
        videoId,
        downloadUrl: video_url
      });

    } catch (dbError) {
      console.error('Database operation failed:', dbError);
      return NextResponse.json(
        { 
          error: 'Database operation failed',
          details: dbError instanceof Error ? dbError.message : String(dbError)
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json(
      { 
        error: 'Internal Server Error',
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}