import { mutation, query } from "./_generated/server";

// Mutation to track a visitor and view
export const trackVisitor = mutation({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Check if we already have a record for today
    const existingRecord = await ctx.db
      .query("visitors")
      .withIndex("by_date", (q) => q.eq("date", today))
      .first();
    
    if (existingRecord) {
      // Update existing record
      await ctx.db.patch(existingRecord._id, {
        count: existingRecord.count + 1,
        totalViews: (existingRecord.totalViews || 0) + 1
      });
    } else {
      // Create new record for today
      await ctx.db.insert("visitors", {
        date: today,
        count: 1,
        totalViews: 1
      });
    }
  }
});

// Add a new mutation for tracking just views
export const trackPageView = mutation({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0];
    
    const existingRecord = await ctx.db
      .query("visitors")
      .withIndex("by_date", (q) => q.eq("date", today))
      .first();
    
    if (existingRecord) {
      await ctx.db.patch(existingRecord._id, {
        totalViews: (existingRecord.totalViews || 0) + 1
      });
    } else {
      await ctx.db.insert("visitors", {
        date: today,
        count: 0,
        totalViews: 1
      });
    }
  }
});

// Query to get visitor stats with total views
export const getDailyStats = query({
  args: {},
  handler: async (ctx) => {
    const today = new Date().toISOString().split('T')[0];
    
    // Get last 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const startDate = thirtyDaysAgo.toISOString().split('T')[0];
    
    // Get all records for the last 30 days
    const records = await ctx.db
      .query("visitors")
      .filter(q => q.gte(q.field("date"), startDate))
      .collect();
    
    // Get today's stats
    const todayRecord = records.find(r => r.date === today);
    
    // Calculate totals
    const totalViews = records.reduce((sum, record) => sum + (record.totalViews || 0), 0);
    const totalVisitors = records.reduce((sum, record) => sum + record.count, 0);
    
    return {
      todayCount: todayRecord?.count || 0,
      todayViews: todayRecord?.totalViews || 0,
      totalViews,
      totalVisitors,
      dailyTrends: records
        .sort((a, b) => a.date.localeCompare(b.date))
        .map(r => ({
          date: r.date,
          visitors: r.count,
          views: r.totalViews || 0
        })),
      maxCount: Math.max(...records.map(r => Math.max(r.count, r.totalViews || 0)), 1)
    };
  }
});



// convex/analytics.ts
export const getSummary = query({
  args: {},
  handler: async (ctx) => {
    
    const topics = await ctx.db
      .query("videoData")
      .collect();
    
    const topicCounts = topics.reduce((acc, video) => {
      const topic = video.topic || "Other";
      acc[topic] = (acc[topic] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const topicStats = Object.entries(topicCounts)
      .map(([topic, count]) => ({ topic, count }))
      .sort((a, b) => b.count - a.count);
    
    // Get activity statistics
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentVideos = await ctx.db
      .query("videoData")
      .filter(q => q.gte(q.field("_creationTime"), thirtyDaysAgo.getTime()))
      .collect();
    
    const activityByDay = recentVideos.reduce((acc, video) => {
      const date = new Date(video._creationTime).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = { activeUsers: new Set(), videosCreated: 0 };
      }
      acc[date].activeUsers.add(video.createdBy);
      acc[date].videosCreated++;
      return acc;
    }, {} as Record<string, { activeUsers: Set<string>, videosCreated: number }>);
    
    const activityStats = Object.entries(activityByDay)
      .map(([date, stats]) => ({
        date,
        activeUsers: stats.activeUsers.size,
        videosCreated: stats.videosCreated
      }))
      .sort((a, b) => a.date.localeCompare(b.date));
    
    const maxTopicCount = Math.max(...topicStats.map(t => t.count), 1);
    const maxActiveUsers = Math.max(...activityStats.map(s => s.activeUsers), 1);
    const maxVideosPerDay = Math.max(...activityStats.map(s => s.videosCreated), 1);
    
    return {
      topicStats,
      activityStats,
      maxTopicCount,
      maxActiveUsers,
      maxVideosPerDay
    };
  },
});