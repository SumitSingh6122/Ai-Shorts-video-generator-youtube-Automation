"use client";
import React, { useMemo } from 'react';
import { VideoData } from '../type';
import { AbsoluteFill, Audio, Img, interpolate, Sequence, useCurrentFrame, useVideoConfig } from 'remotion';

interface RemotionProps {
  videoData: VideoData | null;
  setDurationInFrame?: (frame: number) => void;
}

const RemotionComposition: React.FC<RemotionProps> = ({ videoData, setDurationInFrame }) => {
  const captions = useMemo(() => videoData?.captionJson || [], [videoData]);
  const ImageList = useMemo(() => videoData?.image || [], [videoData]);
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  // Calculate total duration based on last caption end time
  const getDuration = useMemo(() => {
    if (!captions.length) return 0;
    const lastCaptionEnd = captions[captions.length - 1]?.end;
    return Math.ceil((typeof lastCaptionEnd === 'number' ? lastCaptionEnd : 0) * fps);
  }, [captions, fps]);

  // Set total duration once calculated
  React.useEffect(() => {
    if (getDuration && setDurationInFrame) {
      setDurationInFrame(getDuration);
    }
  }, [getDuration, setDurationInFrame]);

  if (!captions.length || !ImageList.length) return null;

  // Current caption text based on frame
  const currentTime = frame / fps;
  const currentCaption = captions.find((item) => currentTime >= item.start && currentTime <= item.end);
  const captionText = currentCaption ? currentCaption.word : '';

  // Animation parameters
  const overlapFrames = Math.floor(0.5 * fps); // 0.5 second overlap
  const imageDuration = getDuration / ImageList.length;

  return (
    <div>
      <AbsoluteFill>
        {ImageList.map((item, index) => {
          const sequenceFrom = index * imageDuration - overlapFrames;
          const sequenceDuration = imageDuration + 2 * overlapFrames;

          // Crossfade opacity calculation
          const opacity = interpolate(
            frame,
            [sequenceFrom, sequenceFrom + overlapFrames, sequenceFrom + sequenceDuration - overlapFrames, sequenceFrom + sequenceDuration],
            [0, 1, 1, 0],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          // Smooth scale animation
          const scaleProgress = interpolate(
            frame,
            [sequenceFrom, sequenceFrom + sequenceDuration],
            [0.9, 1.1],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );

          return (
            <Sequence 
              key={index}
              from={Math.max(0, sequenceFrom)}
              durationInFrames={sequenceDuration}
            >
              <AbsoluteFill style={{ opacity }}>
                <Img
                  src={item}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transform: `scale(${scaleProgress})`,
                  }}
                />
              </AbsoluteFill>
            </Sequence>
          );
        })}
      </AbsoluteFill>

      {/* Caption display */}
      <AbsoluteFill style={{
        justifyContent: 'center',
        alignItems: 'center',
        bottom: '10%',
        textAlign: 'center',
        padding: '0 40%',
      }}>
        <h2
        className={videoData?.caption_Style}
         style={{
        
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          fontSize: '2.5em',
        }}>
          {captionText}
        </h2>
      </AbsoluteFill>

      {videoData?.audioURL && <Audio src={videoData.audioURL} />}
    </div>
  );
};

export default RemotionComposition;