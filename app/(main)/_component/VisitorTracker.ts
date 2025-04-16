
"use client";

import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

export function VisitorTracker() {
  const trackVisitor = useMutation(api.vsitors.trackVisitor);
  const trackPageView = useMutation(api.vsitors.trackPageView);

  useEffect(() => {
    // Always track a page view
    trackPageView();

    // Check if we've already tracked this visitor today
    const sessionKey = 'visitor_tracked_today';
    const today = new Date().toISOString().split('T')[0];
    const lastTracked = localStorage.getItem(sessionKey);

    // Only track unique visitor once per day
    if (lastTracked !== today) {
      trackVisitor()
        .then(() => {
          localStorage.setItem(sessionKey, today);
        })
        .catch(console.error);
    }
  }, [trackVisitor, trackPageView]);

  return null;
}