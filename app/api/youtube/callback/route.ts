import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { cookies } from 'next/headers';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.redirect(new URL('/youtube-upload?error=no_code', req.url));
  }

  try {
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_APP_URL}/api/youtube/callback`
    );

    const { tokens } = await oauth2Client.getToken(code);

    const cookieStore = await cookies(); 
    cookieStore.set('youtube_access_token', tokens.access_token || '');
    cookieStore.set('youtube_refresh_token', tokens.refresh_token || '');

    return NextResponse.redirect(new URL('/youtube-upload?connected=true', req.url));
  } catch (error) {
    console.error('OAuth error:', error);
    return NextResponse.redirect(new URL('/youtube-upload?error=auth_failed', req.url));
  }
}
