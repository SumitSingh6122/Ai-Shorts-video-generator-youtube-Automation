import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { google } from 'googleapis';

export async function GET() {
  try {
    const cookieStore =await cookies(); 
    const accessToken = cookieStore.get('youtube_access_token');

    if (!accessToken) {
      return NextResponse.json({ isConnected: false });
    }

    const oauth2Client = new google.auth.OAuth2();
    oauth2Client.setCredentials({ access_token: accessToken.value });

    const youtube = google.youtube({
      version: 'v3',
      auth: oauth2Client
    });

    // Test the connection by getting channel info
    await youtube.channels.list({
      part: ['snippet'],
      mine: true
    });

    return NextResponse.json({ isConnected: true });
  } catch (error) {
    console.error('Connection check error:', error);
    return NextResponse.json({ isConnected: false });
  }
}
