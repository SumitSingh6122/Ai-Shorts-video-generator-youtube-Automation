"use client"
import React, { useEffect, useMemo, useState } from 'react';
import { VideoData } from '../type';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';


interface RemotionProps {
  videoData: VideoData | null;
  setDurationInFrame: (frame: number) => void;
}

const RemotionComposition: React.FC<RemotionProps> = ({ videoData, setDurationInFrame }) => {

  const captions = useMemo(()=>videoData?.captionJson || [],[videoData]);
  const ImageList = useMemo(()=>videoData?.image || [],[videoData]);
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (captions.length) {
      const lastCaptionEnd = captions[captions.length - 1]?.end;
      if (typeof lastCaptionEnd === 'number') {
        const totalDuration = Math.ceil(lastCaptionEnd * fps);
        setDurationInFrame(totalDuration);
      }
    }
  }, [captions, fps, setDurationInFrame]);

  
  useEffect(() => {
    const preloadImages = async () => {
      try {
        await Promise.all(
          ImageList.map((src) => {
            return new Promise((resolve, reject) => {
              const img = new Image();
              img.src = src;
              img.onload = resolve;
              img.onerror = reject;
            });
          })
        );
        setIsLoading(false);
      } catch (error) {
        console.error('Image failed to load:', error);
        setIsLoading(false);
      }
    };

    if (ImageList.length > 0) {
      preloadImages();
    }
  }, [ImageList]);

  if (!captions.length || !ImageList.length) return <div>No Data Available</div>;

  if (isLoading) {
    return (
      <AbsoluteFill className="flex items-center justify-center bg-black text-white">
        Loading Video...
      </AbsoluteFill>
    );
  }
 const captionStyle=videoData?.caption_Style;

  const getDuration = Math.ceil(captions[captions.length - 1].end * fps);
  const getCaption=()=>{
    const currentTime=frame/fps;
    const currentCaption=captions.find((item)=>currentTime>=item.start && currentTime<=item.end);
    return currentCaption? currentCaption.word:'';
  }

  return (
    <div>
    <AbsoluteFill>
      {ImageList.map((item, index) => {
        const startTime = Math.round((index * getDuration) / ImageList.length);
        const duration = Math.round(getDuration / ImageList.length);

        const scale = interpolate(
          Math.min(frame, startTime + duration),
          [startTime, startTime + duration / 2, startTime + duration],
          index % 2 === 0 ? [1, 1.3, 1] : [1.3, 1, 1.3],
          { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
        );

        return (
          <Sequence key={index} from={startTime-1} durationInFrames={duration+2}>
            <AbsoluteFill>
              <Img
                src={item}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${scale})`,
                }}
              />
            </AbsoluteFill>
          </Sequence>
        );
      })}
      
    </AbsoluteFill>
    <AbsoluteFill
    style={{
      color:'white',
      justifyContent:'center',
      bottom:50,
     top:950,
      height:150,
      textAlign:'center'
      
    }}
    >
      <h2 className={`${captionStyle} `}>{getCaption()}</h2>
    </AbsoluteFill>
    {videoData?.audioURL && <Audio src={videoData.audioURL} />}
    </div>
  );
};

export default RemotionComposition;
