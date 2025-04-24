import React from 'react';
import {Composition} from 'remotion';
import RemotionComposition from '../app/page_compoonents/RemotionComposition.tsx'; // <-- use relative path


const videoData = {
  audioURL: '',
  captionJson: [
    { start: 0, end: 2, word: 'Hello' },
    { start: 2, end: 4, word: 'World' },
  ]
  ,
  image: [],
};


const fps = 30;
const captions = videoData.captionJson;
const lastCaptionEnd = captions[captions.length - 1]?.end || 0;
const durationInFrames = Math.ceil(lastCaptionEnd * fps);
export const RemotionRoot= () => {
  return (
    <>
      <Composition
        id="MyVideo"
        component={RemotionComposition}
        durationInFrames={durationInFrames}
        fps={30}
        width={720}
        height={1280}
        defaultProps={{
          videoData:videoData,
          setDurationInFrame: () => {}, 
        }}
      />
    </>
  );
};
