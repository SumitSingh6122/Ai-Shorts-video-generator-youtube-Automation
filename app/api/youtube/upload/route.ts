import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { cookies } from 'next/headers';
import { Readable } from 'stream';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { title, description, tags, visibility, videoUrl } = body;
     console.log(title,description,tags,visibility,videoUrl);
    if (!title || !description || !visibility || !videoUrl) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 200 });
    }

    const cookieStore =await cookies();
    const accessToken = cookieStore.get('youtube_access_token');

    if (!accessToken) {
      return NextResponse.json(
        { error: 'Not authenticated with YouTube' },
        { status: 401 }
      );
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken.value });

    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client,
    });

    // Fetch the video from URL
    const videoResponse = await fetch(videoUrl);
    if (!videoResponse.ok) {
      return NextResponse.json({ error: 'Failed to fetch video from URL' }, { status: 400 });
    }

    const videoBuffer = Buffer.from(await videoResponse.arrayBuffer());

    // Convert buffer to stream
    const bufferToStream = (buffer: Buffer) => {
      const readable = new Readable();
      readable._read = () => {};
      readable.push(buffer);
      readable.push(null);
      return readable;
    };

    const uploadResponse = await youtube.videos.insert({
      part: ['snippet', 'status'],
      requestBody: {
        snippet: {
          title,
          description,
          tags: Array.isArray(tags) ? tags : [],
        },
        status: {
          privacyStatus: visibility,
        },
      },
      media: {
        body: bufferToStream(videoBuffer),
      },
    });

    return NextResponse.json({
      videoId: uploadResponse.data.id,
      message: 'Video uploaded successfully',
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Failed to upload video' }, { status: 500 });
  }
}
