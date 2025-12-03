# PostHog Video Analytics Implementation Plan

## Overview

This document outlines the plan for implementing comprehensive video analytics using PostHog to track viewer engagement, drop-off rates, and completion metrics across all video players in the TMU Movie Funnel application.

## Why PostHog for Video Analytics?

- **Custom Event Tracking**: Capture granular video interactions
- **Funnel Analysis**: Visualize drop-off rates at different video milestones
- **Session Replay Context**: Understand user behavior around video interactions
- **User Paths**: Track the sequence of video engagement events
- **Segmentation**: Group users by engagement level

## Installation

### 1. Install PostHog SDK

```bash
npm install posthog-js
```

### 2. Environment Variables

Create or update `.env.local`:

```env
NEXT_PUBLIC_POSTHOG_KEY=your_project_api_key
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

> **Note**: Get your API key from PostHog project settings at https://app.posthog.com

## Implementation Steps

### 1. Create PostHog Provider

**File**: `components/providers/posthog-provider.tsx`

```typescript
"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window !== "undefined") {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") posthog.debug();
        },
      });
    }
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
```

### 2. Add Provider to Layout

**File**: `app/layout.tsx`

```typescript
import { PostHogProvider } from "@/components/providers/posthog-provider";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PostHogProvider>
          {children}
        </PostHogProvider>
      </body>
    </html>
  );
}
```

## Video Event Tracking

### Event Schema

All video events should include the following properties:

```typescript
interface VideoEventProperties {
  video_url: string;           // URL of the video
  video_duration: number;       // Total duration in seconds
  current_time: number;         // Current playback position in seconds
  percentage_watched: number;   // Percentage (0-100)
  player_type: "ReactVideoPlayer" | "VideoPlayer"; // Component type
  page_path: string;            // Current page path
  is_muted: boolean;            // Mute status
  video_id?: string;            // Optional: vturb player ID
}
```

### Events to Track

#### 1. Video Started
**Event Name**: `video_started`

Triggered when:
- Video begins playing for the first time
- User clicks play button

```typescript
posthog.capture("video_started", {
  video_url: videoUrl,
  video_duration: duration,
  current_time: 0,
  percentage_watched: 0,
  player_type: "ReactVideoPlayer",
  page_path: window.location.pathname,
  is_muted: true,
});
```

#### 2. Video Progress Milestones
**Event Name**: `video_progress`

Triggered at:
- 25% watched
- 50% watched
- 75% watched

```typescript
posthog.capture("video_progress", {
  video_url: videoUrl,
  video_duration: duration,
  current_time: currentTime,
  percentage_watched: 25, // or 50, 75
  player_type: "ReactVideoPlayer",
  page_path: window.location.pathname,
  is_muted: muted,
  milestone: "25%", // or "50%", "75%"
});
```

#### 3. Video Completed
**Event Name**: `video_completed`

Triggered when:
- Video reaches 100% (or 95%+ to account for early exits)

```typescript
posthog.capture("video_completed", {
  video_url: videoUrl,
  video_duration: duration,
  current_time: duration,
  percentage_watched: 100,
  player_type: "ReactVideoPlayer",
  page_path: window.location.pathname,
  is_muted: muted,
});
```

#### 4. Video Paused
**Event Name**: `video_paused`

Triggered when:
- User manually pauses the video

```typescript
posthog.capture("video_paused", {
  video_url: videoUrl,
  video_duration: duration,
  current_time: currentTime,
  percentage_watched: percentage,
  player_type: "ReactVideoPlayer",
  page_path: window.location.pathname,
  is_muted: muted,
});
```

#### 5. Video Resumed
**Event Name**: `video_resumed`

Triggered when:
- User resumes after pausing

```typescript
posthog.capture("video_resumed", {
  video_url: videoUrl,
  video_duration: duration,
  current_time: currentTime,
  percentage_watched: percentage,
  player_type: "ReactVideoPlayer",
  page_path: window.location.pathname,
  is_muted: muted,
});
```

#### 6. Video Unmuted
**Event Name**: `video_unmuted`

Triggered when:
- User clicks to unmute the video

```typescript
posthog.capture("video_unmuted", {
  video_url: videoUrl,
  video_duration: duration,
  current_time: currentTime,
  percentage_watched: percentage,
  player_type: "ReactVideoPlayer",
  page_path: window.location.pathname,
  is_muted: false,
});
```

## Player Implementation Examples

### ReactVideoPlayer Component

**File**: `components/organisms/react-video-player/index.tsx`

```typescript
"use client";

import React, { useRef, useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { usePostHog } from "posthog-js/react";

export const ReactVideoPlayer = ({
  videoUrl,
  // ... other props
}: ReactVideoPlayerProps) => {
  const posthog = usePostHog();
  const playerRef = useRef<any>(null);
  const [muted, setMuted] = useState(true);
  
  // Track milestones
  const milestonesTracked = useRef({
    25: false,
    50: false,
    75: false,
  });

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    const percentage = Math.floor(state.played * 100);
    
    // Track milestones
    if (percentage >= 25 && !milestonesTracked.current[25]) {
      milestonesTracked.current[25] = true;
      posthog.capture("video_progress", {
        video_url: videoUrl,
        current_time: state.playedSeconds,
        percentage_watched: 25,
        milestone: "25%",
        player_type: "ReactVideoPlayer",
        page_path: window.location.pathname,
        is_muted: muted,
      });
    }
    // Repeat for 50% and 75%...
  };

  const handleStart = () => {
    posthog.capture("video_started", {
      video_url: videoUrl,
      current_time: 0,
      percentage_watched: 0,
      player_type: "ReactVideoPlayer",
      page_path: window.location.pathname,
      is_muted: muted,
    });
  };

  const handleEnded = () => {
    posthog.capture("video_completed", {
      video_url: videoUrl,
      percentage_watched: 100,
      player_type: "ReactVideoPlayer",
      page_path: window.location.pathname,
      is_muted: muted,
    });
  };

  return (
    <ReactPlayer
      ref={playerRef}
      url={videoUrl}
      onStart={handleStart}
      onProgress={handleProgress}
      onEnded={handleEnded}
      // ... other props
    />
  );
};
```

### VideoPlayer (vturb) Component

**File**: `components/organisms/video-player/index.tsx`

For vturb player, use the player API or postMessage events:

```typescript
"use client";

import { usePostHog } from "posthog-js/react";

export const VideoPlayer = ({
  playerId,
  scriptSrc,
}: VideoPlayerProps) => {
  const posthog = usePostHog();

  useEffect(() => {
    // Listen for vturb player events via postMessage
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== "https://scripts.converteai.net") return;
      
      const data = event.data;
      
      if (data.type === "video_started") {
        posthog.capture("video_started", {
          video_id: playerId,
          player_type: "VideoPlayer",
          page_path: window.location.pathname,
        });
      }
      // Handle other events...
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [posthog, playerId]);

  // ... rest of component
};
```

## PostHog Funnel Setup

### Creating a Video Engagement Funnel

1. Navigate to **Insights** → **New Insight** → **Funnel**

2. Add steps in sequence:
   - Step 1: `video_started`
   - Step 2: `video_progress` where `milestone = 25%`
   - Step 3: `video_progress` where `milestone = 50%`
   - Step 4: `video_progress` where `milestone = 75%`
   - Step 5: `video_completed`

3. Configure filters:
   - Filter by `page_path` to analyze specific pages
   - Filter by `player_type` to compare players
   - Time window: Set to match average video length

4. Save and monitor drop-off rates at each milestone

### Creating Dashboards

Create a **Video Analytics Dashboard** with:

1. **Engagement Funnel** - Drop-off visualization
2. **Completion Rate Trend** - Over time
3. **Average Watch Time** - Custom metric
4. **Unmute Rate** - Percentage who unmute
5. **Page Performance** - Compare video engagement by page

## Expected Outcomes

After implementation, you'll have:

✅ **Drop-off Analysis**: See exactly where users stop watching  
✅ **Completion Metrics**: Track what percentage finish videos  
✅ **Engagement Patterns**: Understand user behavior  
✅ **A/B Testing Data**: Compare different video strategies  
✅ **User Segmentation**: Group by engagement level  
✅ **Session Context**: See what users do before/after videos

## Best Practices

1. **Batch Events**: Don't track every second, use milestones
2. **Include Context**: Always add page path and player type
3. **Test Thoroughly**: Verify events fire correctly in development
4. **Monitor Performance**: Ensure tracking doesn't impact playback
5. **Privacy Compliance**: Respect user privacy settings

## Testing

### Development Testing

Enable PostHog debug mode:

```typescript
posthog.init(apiKey, {
  api_host: apiHost,
  loaded: (posthog) => {
    if (process.env.NODE_ENV === "development") {
      posthog.debug(); // Log all events to console
    }
  },
});
```

### Verification Checklist

- [ ] Events appear in PostHog live events feed
- [ ] All properties are captured correctly
- [ ] Milestone events fire at correct percentages
- [ ] No duplicate events
- [ ] Performance is not impacted
- [ ] Works on both desktop and mobile

## Timeline

**Estimated Implementation Time**: 4-6 hours

- Setup & Installation: 1 hour
- ReactVideoPlayer instrumentation: 1.5 hours
- VideoPlayer (vturb) instrumentation: 1.5 hours
- Testing & verification: 1-2 hours

## Future Enhancements

- Track video quality changes
- Monitor buffering events
- Track playback speed adjustments
- Capture device and browser information
- Implement cohort analysis
- A/B test different video content

## Resources

- [PostHog Video Tracking Guide](https://posthog.com/questions/tracking-videos)
- [PostHog Funnels Documentation](https://posthog.com/docs/product-analytics/funnels)
- [PostHog Session Replay](https://posthog.com/docs/session-replay)
- [ReactPlayer API](https://github.com/cookpete/react-player)

---

**Last Updated**: November 30, 2025  
**Status**: Planning Phase - Implementation Pending

