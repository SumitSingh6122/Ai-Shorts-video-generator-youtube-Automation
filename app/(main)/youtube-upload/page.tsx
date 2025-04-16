'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Youtube, Upload, Loader2 } from 'lucide-react';
import { useState, FormEvent, useEffect } from 'react';
import axios from 'axios';
import { useAuthContext } from '@/app/provider';
import { useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import Image from 'next/image';
import { toast } from 'react-toastify';

interface UploadForm {
  title: string;
  description: string;
  tags: string;
  visibility: 'public' | 'private' | 'unlisted';
  videoUrl: string;
}



export default function YoutubeUpload() {
  const { user } = useAuthContext();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isYoutubeConnected, setIsYoutubeConnected] = useState(false);
  const [formData, setFormData] = useState<UploadForm>({
    title: '',
    description: '',
    tags: '',
    visibility: 'public',
    videoUrl: ''
  });
  console.log(formData);
  useEffect(() => {
    if (!user) {
      router.replace('/');
    }
    checkYouTubeConnection();
  }, [user, router]);
   const UserVideoList=useQuery(api.videoData.GetUserVideos,user ? { uid: user._id as Id<"user"> } : "skip");
  const checkYouTubeConnection = async () => {
    try {
      const response = await axios.get('/api/youtube/check-connection');
      setIsYoutubeConnected(response.data.isConnected);
    } catch (error) {
      console.error('Failed to check YouTube connection:', error);
    }
  };

  const handleConnectYoutube = async () => {
    try {
      const response = await axios.get('/api/youtube/auth-url');
      window.location.href = response.data.url;
    } catch (error) {
      console.error('Failed to get auth URL:', error);
      alert('Failed to connect to YouTube');
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const payload = {
        title: formData.title,
        description: formData.description,
        visibility: formData.visibility,
        videoUrl: formData.videoUrl,
        tags: formData.tags
          ? formData.tags.split(',').map((tag) => tag.trim())
          : [],
      };
    console.log(payload);
      const response = await axios.post('/api/youtube/upload', payload);
      console.log(response.data);
       toast.success('Video uploaded successfully!');
     
    } catch (error) {
      toast.error('Failed to upload video');
      console.error('Upload failed:', error);
      
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="max-w-4xl mx-auto py-10 px-5">
      <div className="flex items-center gap-3 mb-8">
        <Youtube className="h-8 w-8 text-red-500" />
        <h1 className="text-3xl font-bold">Upload to YouTube</h1>
      </div>

      {!isYoutubeConnected ? (
        <Card className="p-6 text-center">
          <Youtube className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Connect Your YouTube Account</h2>
          <p className="text-gray-500 mb-6">
            To upload videos, you need to connect your YouTube account first.
            This will allow us to upload videos on your behalf.
          </p>
          <Button onClick={handleConnectYoutube} size="lg" className="gap-2">
            <Youtube className="h-5 w-5" />
            Connect YouTube Account
          </Button>
        </Card>
      ) : (
        <Card className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Video Title</label>
              <Input
                placeholder="Enter video title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Description</label>
              <Textarea
                placeholder="Enter video description"
                className="min-h-[150px]"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Tags (comma separated)</label>
              
              <Input
                placeholder="ai, shorts, tutorial"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Visibility</label>
              <select
                className="w-full p-2 border bg-black rounded-md"
                value={formData.visibility}
                onChange={(e) =>
                  setFormData({ ...formData, visibility: e.target.value as UploadForm['visibility'] })
                }
              >
                <option value="private">Private</option>
                <option value="unlisted">Unlisted</option>
                <option value="public">Public</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Select Video</label>
              <div className='grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5  gap-5 ml-5 mt-2'>
                {
                  UserVideoList?.map((vid,index)=>(
                    <div className={`rounded-2xl p-1 border  ${vid.DowloadURL==formData.videoUrl ? 'border-white':''}`} key={index}  onClick={()=>{setFormData({...formData,videoUrl:vid.DowloadURL || ''});
                    
                    }}>
                      <Image src={vid.image[0]} height={200} width={200} alt={vid.title}    className='w-full object-cover rounded-xl aspect-[2/3]' />
                    </div>

                  ))
                }

                
              </div>

              <Input
                placeholder="https://example.com/video.mp4"
                value={formData.videoUrl}
                className='mt-5'
                onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                required
              />
            </div>

            <Button type="submit" disabled={loading} className="w-full" size="lg">
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Upload to YouTube 
                </>
              )}
            </Button>
          </form>
        </Card>
      )}

      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Your videos will be uploaded to your connected YouTube account.</p>
        <p>Make sure your video URL is accessible and points to a valid MP4 file.</p>
      </div>
    </div>
  );
}
