import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { google } from 'googleapis';

export async function POST() {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('youtube_access_token');

    if (accessToken) {
      const oauth2Client = new google.auth.OAuth2();
      await oauth2Client.revokeToken(accessToken.value);
    }

    // Clear tokens
    cookieStore.delete('youtube_access_token');
    cookieStore.delete('youtube_refresh_token');

    return NextResponse.json({ message: 'YouTube connection revoked' });
  } catch (error) {
    console.error('Revoke error:', error);
    return NextResponse.json(
      { error: 'Failed to revoke YouTube connection' },
      { status: 500 }
    );
  }
}