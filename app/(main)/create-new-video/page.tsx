"use client";
import React, { useState } from 'react';
import Topic from './create_video_component/Topic';
import Videostyle from './create_video_component/Videostyle';
import Voice from './create_video_component/Voice';
import Caption from './create_video_component/Caption';
import { Button } from '@/components/ui/button';
import { Loader2Icon, WandSparkles } from 'lucide-react';
import Preview from './create_video_component/Preview';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useAuthContext } from '@/app/provider';
import { Id } from '@/convex/_generated/dataModel';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormDataType {
    title: string;
    topic: string;
    script: string;
    VideoStyle: string;
    Voice: string;
    caption_Style: string;
    caption_name: string;
}



const CreateNewVideo = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const initialFormData: FormDataType = {
        title: "",
        topic: "",
        script: "",
        VideoStyle: "",
        Voice: "",
        caption_Style: "",
        caption_name: "",
    };

    const [formData, setFormData] = useState<FormDataType>(initialFormData);
    const CreateInitialVideoData = useMutation(api.videoData.CreateVideoData);
    const { user } = useAuthContext();


    const onHandleInputChange = (fieldName: string, fieldValue: string) => {
        setFormData(prev => ({
            ...prev,
            [fieldName]: fieldValue
        }));
    };

  
    const GenerateVideo = async () => {
        setLoading(true);

        if (user?.credits === 0) {
            router.push('/billing');
            return;
        }

        const isFormComplete = Object.values(formData).every(val => val.trim() !== '');
        if (!isFormComplete) {
          
            toast.error("All fields are required");
            setLoading(false);
            return;
        }

        try {
            const res = await CreateInitialVideoData({
                title: formData.title,
                topic: formData.topic,
                script: formData.script,
                videoStyle: formData.VideoStyle,
                caption_name: formData.caption_name,
                caption_Style: formData.caption_Style,
                Voice: formData.Voice,
                uid: user?._id as Id<"user">,
                createdBy: user?.email ?? '',
                credits: user?.credits ?? 3
            });

            await axios.post('/api/generate-video-data', {
                ...formData,
                recordId: res
            });

            router.push('/dashboard');

        } catch (error) {
            console.error("Video generation failed", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2 className="text-4xl">Create New Video</h2>
            <div className="grid md:grid-cols-3 grid-cols-1 mt-8 gap-7">

                {/* Left Side Form */}
                <div className="col-span-2 p-7 border rounded-xl h-[70vh] overflow-auto space-y-5">

                    <Topic onHandleInputChange={onHandleInputChange} />
                    <Videostyle onHandleInputChange={onHandleInputChange} />
                    <Voice onHandleInputChange={onHandleInputChange} />
                    <Caption onHandleInputChange={onHandleInputChange} />

                    <Button
                        onClick={GenerateVideo}
                        disabled={loading}
                        className="w-full mt-5 font-bold"
                    >
                        {loading ? (
                            <>
                                <Loader2Icon className="animate-spin mr-2" /> Generating...
                            </>
                        ) : (
                            <>
                                <WandSparkles className="mr-2" /> Generate Video
                            </>
                        )}
                    </Button>
                </div>

                {/* Right Side Preview */}
                <div>
                    <Preview FormData={formData} />
                </div>
            </div>
        </div>
    );
};

export default CreateNewVideo;
