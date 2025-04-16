"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useAuthContext } from "@/app/provider";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function AdminPage() {
  const router = useRouter();
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  // Fetch real data from Convex
  const users = useQuery(api.user.listAll);
  const totalVideos = useQuery(api.videoData.GetTotalVideos);
  const visitorStats = useQuery(api.vsitors.getDailyStats);
  const analytics = useQuery(api.vsitors.getSummary);
console.log("states" ,visitorStats);
  useEffect(() => {
    if (!user || user?.role !== "admin") {
      router.push("/dashboard");
      return;
    }

    if (users && totalVideos && visitorStats) {
      setLoading(false);
    }
  }, [router, user, users, totalVideos, visitorStats]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Loading admin dashboard...</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Total Users</CardTitle>
                <CardDescription>Active user accounts</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">{users?.length || 0}</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Videos Created</CardTitle>
                <CardDescription>Total videos generated</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {totalVideos?.length || 0}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Daily Visitors</CardTitle>
                <CardDescription>Unique visitors today</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">
                  {visitorStats?.todayCount || 0}
                </div>
                <div className="text-sm text-muted-foreground">
               Views today: {visitorStats?.todayViews || 0}
              </div>
              </CardContent>
            </Card>
            <Card>
      <CardHeader className="pb-2">
        <CardTitle>Total Views</CardTitle>
        <CardDescription>All time page views</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold">
          {visitorStats?.totalViews || 0}
        </div>
        <div className="text-sm text-muted-foreground">
          Total visitors: {visitorStats?.totalVisitors || 0}
        </div>
      </CardContent>
    </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Visitor Trends</CardTitle>
              <CardDescription>Visitors over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <div className="flex h-64 items-end space-x-2">
                  {visitorStats?.dailyTrends?.map((day, index) => (
                    <div 
                      key={index} 
                      className="bg-primary/80 hover:bg-primary w-full rounded-t transition-all"
                      style={{ 
                        height: `${Math.min((day.views / (visitorStats.maxCount || 1)) * 100, 100)}%`,
                      }}
                      title={`${day.date}: ${day.views} visitors`}
                    />
                  ))}
                </div>
                {  (visitorStats?.dailyTrends?.length ?? 0)  > 0 && (
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>{visitorStats?.dailyTrends[0].date}</span>
                    <span>{visitorStats?.dailyTrends[visitorStats.dailyTrends.length - 1].date}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Users Tab */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>All registered users and their activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Credits</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users?.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{new Date(user._creationTime).toLocaleDateString()}</TableCell>
                        <TableCell>{user.role || "user"}</TableCell>
                        <TableCell>
                          <Badge variant={user.isActive ? "default" : "destructive"}>
                            {user.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{user.credits || 0}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Popular Video Topics</CardTitle>
                <CardDescription>Most requested video topics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <div className="h-64 flex items-end space-x-6">
                    {analytics?.topicStats?.map((item, index) => (
                      <div key={index} className="flex flex-col items-center flex-1">
                        <div 
                          className="bg-primary/80 hover:bg-primary w-full rounded-t transition-all"
                          style={{ 
                            height: `${Math.min((item.count / (analytics.maxTopicCount || 1)) * 100, 100)}%` 
                          }}
                        />
                        <span className="text-xs mt-2">{item.topic}</span>
                        <span className="text-xs text-muted-foreground">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>Active users vs Videos created</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <div className="h-64 flex items-end space-x-2 relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none" />
                    {analytics?.activityStats?.map((day, index) => (
                      <div 
                        key={index} 
                        className="relative w-full"
                      >
                        <div
                          className="absolute bottom-0 w-full bg-primary/80 rounded-t transition-all"
                          style={{ 
                            height: `${Math.min((day.activeUsers / (analytics.maxActiveUsers || 1)) * 100, 100)}%` 
                          }}
                          title={`${day.date}: ${day.activeUsers} active users`}
                        />
                        <div
                          className="absolute bottom-0 w-full bg-secondary/80 rounded-t transition-all"
                          style={{ 
                            height: `${Math.min((day.videosCreated / (analytics.maxVideosPerDay || 1)) * 100, 100)}%` 
                          }}
                          title={`${day.date}: ${day.videosCreated} videos created`}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-4 text-xs text-muted-foreground">
                    <div className="flex space-x-4">
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-primary mr-1 rounded" /> Active Users
                      </span>
                      <span className="flex items-center">
                        <span className="w-3 h-3 bg-secondary mr-1 rounded" /> Videos Created
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}