import { NextRequest, NextResponse } from 'next/server';

export async function POST(request:NextRequest) {
  try {
    const { video_url } = await request.json();

    if (!video_url) {
      return NextResponse.json({ error: 'No video URL provided' }, { status: 400 });
    }

    // Validate URL
    try {
      new URL(video_url);
    } catch {
      return NextResponse.json({ error: 'Invalid video URL' }, { status: 400 });
    }

    // Store or process the URL (replace with actual DB logic)
    console.log('✅ Received video URL:', video_url);

    return NextResponse.json({ message: 'Webhook received successfully' });
  } catch (error) {
    console.error('❌ Error in webhook handler:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
