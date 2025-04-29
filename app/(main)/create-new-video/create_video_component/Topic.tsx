"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon, Plus, SparkleIcon, TrendingUp } from 'lucide-react';
import axios from 'axios'

const suggestions = [
    "Historic Story",
    "Kids' Story",
    "Movie Stories",
    "AI Innovations",
    "Space Mysteries",
    "Horror Stories",
    "Mythological Tales",
    "Tech Breakthroughs",
    "True Crime Stories",
    "Fantasy Adventures",
    "Science Experiments",
    "Motivational Stories"
];

// Trending topics - could also fetch these from an API
const trendingTopics = [
    "AI News 2024",
    "Bitcoin Price Prediction",
    "Taylor Swift Tour Updates",
    "Elon Musk Latest Project",
    "Climate Change Solutions",
    "VR Gaming Trends"
];

interface TopicProps {
    onHandleInputChange: (fieldName: string, fieldValue: string) => void;
}

const Topic: React.FC<TopicProps> = ({ onHandleInputChange }) => {
    const [topic, setTopic] = useState('');
    const [customScriptVisible, setCustomScriptVisible] = useState(false);
    const [script, setScript] = useState<{content: string}[]>([]);
    const [selectedScriptIndex, setSelectedScriptIndex] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('suggestion'); // 'suggestion' | 'trending' | 'your_topic'

    const generateScript = async () => {
        if (!topic) return;
        
        setLoading(true);
        setSelectedScriptIndex(null);
        try {
            const result = await axios.post('/api/generate-script', {
                topic: topic
            });
            setScript(result.data.scripts);
        } catch (error) {
            console.error("Script generation failed:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            <h2 className='mb-2 text-lg font-semibold'>Project Title</h2>
            <Input 
                placeholder='Enter Project title...' 
                onChange={(e) => onHandleInputChange('title', e.target.value)} 
            />

            <div className='mt-6'>
                <h2 className="text-lg font-semibold">Video Topic</h2>
                <p className='text-sm text-muted-foreground'>Select Topic for Video</p>
                
                <Tabs 
                    value={activeTab} 
                    onValueChange={setActiveTab}
                    className="w-full mt-3"
                >
                    <TabsList className="grid grid-cols-3">
                        <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
                        <TabsTrigger value="trending">Trending</TabsTrigger>
                        <TabsTrigger value="your_topic">Custom</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="suggestion">
                        <div className="flex flex-wrap gap-2 mt-3">
                            {suggestions.map((suggestion, index) => (
                                <Button 
                                    className={`m-1 ${suggestion === topic ? 'bg-secondary' : ''}`}
                                    variant="outline" 
                                    key={index} 
                                    onClick={() => {
                                        setTopic(suggestion);
                                        onHandleInputChange('topic', suggestion);
                                    }}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="trending">
                        <div className="flex flex-wrap gap-2 mt-3">
                            {trendingTopics.map((trendingTopic, index) => (
                                <Button 
                                    className={`m-1 ${trendingTopic === topic ? 'bg-secondary' : ''}`}
                                    variant="outline" 
                                    key={index} 
                                    onClick={() => {
                                        setTopic(trendingTopic);
                                        onHandleInputChange('topic', trendingTopic);
                                    }}
                                >
                                    <TrendingUp className="w-4 h-4 mr-2" />
                                    {trendingTopic}
                                </Button>
                            ))}
                        </div>
                    </TabsContent>

                    <TabsContent value="your_topic">
                        <div className="mt-3 space-y-2">
                            <h3 className="font-medium">Enter Your Own Topic</h3>
                            <Textarea 
                                placeholder='Enter your topic...'  
                                value={topic}
                                onChange={(e) => {
                                    setTopic(e.target.value);
                                    onHandleInputChange('topic', e.target.value);
                                }}
                            />
                        </div>
                    </TabsContent>
                </Tabs>

                {script.length > 0 && (
                    <div className='mt-6 space-y-3'>
                        <h3 className="font-medium">Generated Scripts</h3>
                        <div className='space-y-3'>
                            {script.map((item, index) => (
                                <div 
                                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                                        selectedScriptIndex === index 
                                            ? 'border-primary bg-secondary' 
                                            : 'hover:bg-accent'
                                    }`}
                                    onClick={() => {
                                        setSelectedScriptIndex(index);
                                        onHandleInputChange('script', item.content);
                                    }}
                                    key={index}
                                >
                                    <p className='line-clamp-3 text-sm'>
                                        {item.content}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <div className='flex gap-3 pt-2'>
                <Button 
                    className='flex items-center gap-2'
                    disabled={loading || !topic}
                    onClick={generateScript}
                >
                    {loading ? (
                        <Loader2Icon className='w-4 h-4 animate-spin' />
                    ) : (
                        <SparkleIcon className="w-4 h-4" />
                    )}
                    Generate Script
                </Button>
                
                <Button 
                    variant='secondary'
                    onClick={() => setCustomScriptVisible((prev) => !prev)}
                    className='flex items-center gap-2'
                >
                    <Plus className="w-4 h-4" />
                    Custom Script
                </Button>
            </div>

            {customScriptVisible && (
                <Textarea 
                    className='mt-4'
                    onChange={(e) => onHandleInputChange('script', e.target.value)}
                    placeholder='Write your custom script here...'
                    rows={6}
                />
            )}
        </div>
    )
}

export default Topic;