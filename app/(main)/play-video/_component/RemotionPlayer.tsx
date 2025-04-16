import React, { useState } from 'react';
import { Player } from '@remotion/player';
import RemotionComposition from '@/app/page_compoonents/RemotionComposition';
import { VideoData } from '@/app/type';

interface RemotionPlayerProps {
  videoData: VideoData | null;
}

const RemotionPlayer: React.FC<RemotionPlayerProps> = ({ videoData }) => {
  const [durationInFrames, setDurationInFrame] = useState<number>(100);

  return (
    <div className="flex justify-center items-center">
      <Player
      
        component={RemotionComposition}
        durationInFrames={Math.ceil(durationInFrames)}
        compositionWidth={720}
        compositionHeight={1280}
        fps={30}
        controls
        style={{
          width: '25vw',
          height: '70vh',
          maxWidth: '360px',
          maxHeight: '720px',
        }}
        inputProps={{
          videoData,
          setDurationInFrame: (framevalue: number) => setDurationInFrame(framevalue),
        }}
      />
    </div>
  );
};

export default RemotionPlayer;
