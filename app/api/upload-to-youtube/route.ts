// app/api/upload-to-youtube/route.ts
import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import axios from 'axios';
import { Readable } from 'stream';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

const youtube = google.youtube({
  version: 'v3',
  auth: oauth2Client
});

export async function POST(request: Request) {
  try {
    const { title, description, videoUrl } = await request.json();
    
    if (!title || !description || !videoUrl) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get video file from URL
    const response = await axios.get(videoUrl, { responseType: 'stream' });
    const videoStream = Readable.from(response.data);

    // Set credentials from environment variables
    oauth2Client.setCredentials({
      access_token: process.env.YOUTUBE_ACCESS_TOKEN,
      refresh_token: process.env.YOUTUBE_REFRESH_TOKEN
    });

    // Upload to YouTube
    const youtubeResponse = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title,
          description,
          categoryId: '22' // See YouTube category IDs
        },
        status: {
          privacyStatus: 'public' // or 'public'/'unlisted'
        }
      },
      media: {
        body: videoStream
      }
    });

    return NextResponse.json({
      message: 'Video uploaded successfully',
      videoId: youtubeResponse.data.id
    });

  } catch (error) {
    console.error('YouTube upload error:', error);
    return NextResponse.json(
      { message: 'Failed to upload video to YouTube' },
      { status: 500 }
    );
  }
}