import { Id } from "@/convex/_generated/dataModel";
type CaptionItem = {
  start: number; 
  end: number;     
  word: string;
};


 export type VideoData = {
  _id: Id<"videoData">;
  _creationTime: number;
  image: string[];
  captionJson: CaptionItem[];
  audioURL: string;
  status: "completed" | "pending" ;
  title: string;
  topic: string;
  script: string;
  videoStyle: string;
  createdBy: string;
  Voice: string;
  caption_Style: string;
  caption_name: string;
  uid: string;
  DowloadURL?: string;
};

