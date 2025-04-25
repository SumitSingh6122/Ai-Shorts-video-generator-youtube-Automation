import React from 'react';
import {Composition} from 'remotion';
import RemotionComposition from '../app/page_compoonents/RemotionComposition.tsx'; // <-- use relative path


const videoData = {
  audioURL: "https://res.cloudinary.com/dk75dh0nv/video/upload/v1745160708/generated_audio/audio_1745160707823.mp3",
  captionJson: [
    { "confidence": 0.9969944, "end": 0.24, "start": 0, "word": "on" },
    { "confidence": 0.99995804, "end": 0.39999998, "start": 0.24, "word": "the" },
    { "confidence": 0.9999235, "end": 0.71999997, "start": 0.39999998, "word": "shores" },
    { "confidence": 0.9999645, "end": 0.88, "start": 0.71999997, "word": "of" },
    { "confidence": 0.99685794, "end": 1.68, "start": 0.88, "word": "normandy" },
    { "confidence": 0.99917233, "end": 1.92, "start": 1.68, "word": "the" },
    { "confidence": 0.999054, "end": 2.1599998, "start": 1.92, "word": "fate" },
    { "confidence": 0.99996483, "end": 2.32, "start": 2.1599998, "word": "of" },
    { "confidence": 0.9997688, "end": 2.48, "start": 2.32, "word": "the" },
    { "confidence": 0.9997243, "end": 2.96, "start": 2.48, "word": "world" },
    { "confidence": 0.9906047, "end": 3.28, "start": 2.96, "word": "hung" },
    { "confidence": 0.99979347, "end": 3.4399998, "start": 3.28, "word": "in" },
    { "confidence": 0.9994118, "end": 3.52, "start": 3.4399998, "word": "the" },
    { "confidence": 0.9966549, "end": 4.16, "start": 3.52, "word": "balance" },
    { "confidence": 0.99749166, "end": 4.96, "start": 4.48, "word": "soldiers" },
    { "confidence": 0.99988294, "end": 5.2, "start": 4.96, "word": "from" },
    { "confidence": 0.9998925, "end": 5.52, "start": 5.2, "word": "across" },
    { "confidence": 0.99981016, "end": 5.68, "start": 5.52, "word": "the" },
    { "confidence": 0.99917835, "end": 6, "start": 5.68, "word": "globe" },
    { "confidence": 0.99578035, "end": 6.48, "start": 6, "word": "stormed" },
    { "confidence": 0.99982554, "end": 6.64, "start": 6.48, "word": "the" },
    { "confidence": 0.836019, "end": 7.28, "start": 6.64, "word": "beaches" },
    { "confidence": 0.99705744, "end": 7.68, "start": 7.3599997, "word": "braving" },
    { "confidence": 0.9996308, "end": 8.16, "start": 7.68, "word": "relentless" },
    { "confidence": 0.99360466, "end": 8.639999, "start": 8.16, "word": "fire" },
    { "confidence": 0.9536972, "end": 9.52575, "start": 9.2057495, "word": "d" },
    { "confidence": 0.7914033, "end": 10.08575, "start": 9.52575, "word": "day" },
    { "confidence": 0.9981609, "end": 10.245749, "start": 10.08575, "word": "a" },
    { "confidence": 0.9994623, "end": 10.56575, "start": 10.245749, "word": "turning" },
    { "confidence": 0.99989736, "end": 10.80575, "start": 10.56575, "word": "point" },
    { "confidence": 0.9998816, "end": 10.96575, "start": 10.80575, "word": "in" },
    { "confidence": 0.97594804, "end": 11.2057495, "start": 10.96575, "word": "world" },
    { "confidence": 0.99984336, "end": 11.445749, "start": 11.2057495, "word": "war" },
    { "confidence": 0.792843, "end": 12.08575, "start": 11.445749, "word": "two" },
    { "confidence": 0.999818, "end": 12.32575, "start": 12.16575, "word": "a" },
    { "confidence": 0.99940693, "end": 12.64575, "start": 12.32575, "word": "testament" },
    { "confidence": 0.9998337, "end": 12.88575, "start": 12.64575, "word": "to" },
    { "confidence": 0.9993588, "end": 13.685749, "start": 12.88575, "word": "courage" },
    { "confidence": 0.99148256, "end": 14.72575, "start": 13.76575, "word": "sacrifice" },
    { "confidence": 0.9999176, "end": 14.96575, "start": 14.88575, "word": "and" },
    { "confidence": 0.99964166, "end": 15.2057495, "start": 14.96575, "word": "the" },
    { "confidence": 0.9998431, "end": 15.445749, "start": 15.2057495, "word": "fight" },
    { "confidence": 0.99985707, "end": 15.685749, "start": 15.445749, "word": "for" },
    { "confidence": 0.9995138, "end": 16.40575, "start": 15.685749, "word": "freedom" },
    { "confidence": 0.9997743, "end": 17.12575, "start": 16.64575, "word": "remember" },
    { "confidence": 0.9959668, "end": 17.28575, "start": 17.12575, "word": "the" },
    { "confidence": 0.98621327, "end": 17.605751, "start": 17.28575, "word": "heroes" },
    { "confidence": 0.9999316, "end": 17.845749, "start": 17.605751, "word": "of" },
    { "confidence": 0.99984026, "end": 18.08575, "start": 17.845749, "word": "june" },
    { "confidence": 0.89899224, "end": 18.40575, "start": 18.08575, "word": "sixth" },
    { "confidence": 0.8825101, "end": 18.80575, "start": 18.40575, "word": "nineteen" },
    { "confidence": 0.99963427, "end": 19.20575, "start": 18.80575, "word": "forty" },
    { "confidence": 0.9934633, "end": 19.44575, "start": 19.20575, "word": "four" }
  ],
  image: [
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745160722412.png?alt=media&token=3034c88e-56ed-45a8-8260-eab0463a6b11",
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745160721584.png?alt=media&token=1c5cba12-f057-4d2d-89a8-4ebdffbdda80",
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745160722130.png?alt=media&token=20bafffb-9439-4210-90e3-676b7c7a8973",
    "https://firebasestorage.googleapis.com/v0/b/projects-2025-71366.firebasestorage.app/o/ai-guru-lab-images%2F1745160720551.png?alt=media&token=7aff6f59-a2e9-4631-a8a0-84ca6dbbdfe4"
  ],
  CaptionStyle: "text-yellow-400 text-4xl font-extrabold uppercase tracking-wide drop-shadow-md"
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
