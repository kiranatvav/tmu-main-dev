# PostHog Setup Guide - What You Need to Do

## ✅ Already Done (Code Side)

I've already implemented:
- ✅ PostHog SDK installed (`posthog-js`)
- ✅ Provider configured with your API key
- ✅ Session Replay enabled with privacy settings
- ✅ All event tracking code (forms, calendar, CTAs)
- ✅ 5 dashboards created in your PostHog account
- ✅ User identification on form submission

**You don't need to write any more code!** 🎉

---

## 🚀 What YOU Need to Do

### Step 1: Deploy Your Code

```bash
git add .
git commit -m "Add PostHog analytics with Session Replay"
git push
```

Once deployed to Vercel, PostHog will **automatically start collecting data**. No dashboard configuration needed - it just works!

---

### Step 2: Enable Session Replay (Optional but Recommended)

Session Replay is already configured in your code, but you need to enable it in PostHog:

1. **Go to PostHog**: https://eu.posthog.com/project/104998
2. **Click on "Session Replay"** in the left sidebar
3. **Toggle "Enable recordings"** to ON
4. **Set recording preferences**:
   - **Sampling rate**: Start with 100% (you can lower later)
   - **Minimum duration**: 2 seconds (filter out bounces)
   - **Console logs**: Enable (helps with debugging)

That's it! Recordings will start appearing within minutes.

---

### Step 3: Verify Data is Flowing (First Hour)

1. **Visit your site** after deployment
2. **Go through the funnel**:
   - Submit the lead form
   - Watch the movie page
   - Click "Schedule Now"
   - View the calendar
3. **Check PostHog** (wait ~2 minutes for data to process):
   - Go to "Activity" → "Events" 
   - You should see: `page_viewed`, `form_viewed`, `form_submitted`, etc.
4. **Check Session Replay**:
   - Go to "Session Replay" → "Recordings"
   - You should see your session appear

---

## 🎬 How to Use Session Replay

### Watch User Sessions

1. **Go to**: https://eu.posthog.com/project/104998/replay
2. **You'll see a list of recordings** with:
   - Session duration
   - Number of events
   - User properties (if identified)
   - Flags if errors occurred

3. **Click any recording to watch**:
   - See exactly what the user sees
   - Watch mouse movements, clicks, scrolling
   - See console logs (errors, warnings)
   - Jump to specific events in the timeline

---

### Find Specific User Journeys

**Example: "Show me users who abandoned the form"**

1. Go to Session Replay
2. Add filters:
   - ✅ Event: `form_viewed` performed
   - ❌ Event: `form_submitted` not performed
3. Click "Apply"
4. Watch recordings to see **why** they abandoned

**Example: "Show me users who had calendar loading issues"**

1. Add filters:
   - ✅ Event: `calendar_page_viewed` performed
   - ✅ Event: `calendar_load_error` performed
2. Watch to see what went wrong

**Example: "Show me converted users (completed booking)"**

1. Add filters:
   - ✅ Event: `calendar_booking_confirmed` performed
2. Watch successful journeys to see what works

---

## 🔒 Privacy Configuration (Already Implemented)

Your Session Replay setup includes privacy protections:

### What's Masked (Hidden from Recordings):
- ✅ **All form inputs** - Names, emails are replaced with `***`
- ✅ **Sensitive elements** - Anything with `data-private` attribute
- ✅ **Third-party iframes** - GHL calendar not recorded (their privacy)

### What's Recorded:
- ✅ Mouse movements and clicks
- ✅ Scrolling and navigation
- ✅ Button clicks
- ✅ Console logs (errors, warnings)
- ✅ Network requests (timing, not content)

### To Mask Additional Elements

If you need to hide something specific, add `data-private` attribute:

```tsx
<div data-private>
  This won't be visible in recordings
</div>
```

---

## 📊 Your PostHog Dashboards

All dashboards are **already created** and will populate automatically:

| Dashboard | What It Shows | Link |
|-----------|---------------|------|
| 🎯 **Main Conversion Funnel** | 8-step journey: Landing → Booking | [View](https://eu.posthog.com/project/104998/dashboard/444063) |
| 📅 **Calendar Performance** | Load times, errors, booking funnel | [View](https://eu.posthog.com/project/104998/dashboard/444064) |
| 📝 **Form Performance** | Field completion, validation errors | [View](https://eu.posthog.com/project/104998/dashboard/444065) |
| 📡 **Traffic & Attribution** | Sources, referrers, campaigns | [View](https://eu.posthog.com/project/104998/dashboard/444066) |
| 👥 **User Behavior** | Navigation patterns, engagement | [View](https://eu.posthog.com/project/104998/dashboard/444067) |

---

## 🎯 Powerful Session Replay Use Cases

### 1. Debug Calendar Loading Issues

**Question**: "Why is the calendar slow for some users?"

**Steps**:
1. Go to Calendar Performance dashboard
2. Click on the "Calendar Load Time" chart
3. Click "Explore" → "View recordings"
4. Watch sessions with slow load times
5. See if it's the user's connection or our code

---

### 2. Optimize Form Conversion

**Question**: "Why do users abandon the form?"

**Steps**:
1. Filter recordings: `form_viewed` but NOT `form_submitted`
2. Watch multiple sessions
3. Look for patterns:
   - Do they hesitate on email field? (Trust issue?)
   - Do they get validation errors? (UX issue?)
   - Do they click away immediately? (Not interested?)

---

### 3. Find Technical Bugs

**Question**: "Are there JavaScript errors affecting users?"

**Steps**:
1. Go to Session Replay
2. Filter by "Console errors: Yes"
3. Watch recordings with errors
4. See the exact error message and what caused it
5. See if the error blocks the user's journey

---

### 4. Understand Drop-Off Points

**Question**: "Where exactly do users give up?"

**Steps**:
1. Look at Main Conversion Funnel dashboard
2. Identify the biggest drop-off step (e.g., "Movie Page → Calendar Page")
3. Filter recordings:
   - ✅ Reached the drop-off page
   - ❌ Didn't complete next step
4. Watch 10-20 sessions to spot patterns

---

## 💰 Session Replay Limits

**PostHog Free Tier**:
- ✅ **1 million events/month** (includes replay events)
- ✅ **Unlimited recordings** (5,000 recorded/month typically)
- ✅ **Recordings stored for 3 weeks**

**Your Expected Usage**:
- ~100-500 sessions/day = 3,000-15,000/month
- Well within limits! ✅

If you exceed (unlikely), PostHog will:
1. Stop recording new sessions
2. Keep all data and dashboards working
3. Ask if you want to upgrade

---

## 🔍 Advanced: Linking Recordings to Events

When viewing any event in PostHog, you can:

1. **From Event → to Recording**:
   - Click any event in "Activity" or on a dashboard
   - Click "View recording" button
   - Jump directly to that moment in the user's session

2. **From Recording → to Events**:
   - Watch a recording
   - See event timeline at the bottom
   - Click any event to jump to that moment

This makes debugging incredibly fast!

---

## ⚡ Quick Start Checklist

- [ ] Deploy code to production (`git push`)
- [ ] Wait 5 minutes for deployment
- [ ] Visit your site and go through the funnel
- [ ] Go to PostHog → "Activity" → "Events" 
- [ ] Verify events are appearing
- [ ] Go to PostHog → "Session Replay"
- [ ] Enable recordings (toggle ON)
- [ ] Refresh → See your recording appear
- [ ] Click to watch your session
- [ ] Bookmark dashboards for daily checking

---

## 🎓 Learning Resources

- **PostHog Session Replay Docs**: https://posthog.com/docs/session-replay
- **Your Project Home**: https://eu.posthog.com/project/104998
- **Event Definitions**: https://eu.posthog.com/data-management/events

---

## 🆘 Troubleshooting

### "I deployed but don't see any events"

1. Wait 2-5 minutes (PostHog has slight delay)
2. Check your browser console for errors
3. Verify you're on the production URL (not localhost)
4. Clear cache and hard reload (Cmd+Shift+R)

### "Session Replay isn't recording"

1. Make sure you enabled recordings in PostHog dashboard
2. Check sampling rate is >0%
3. Verify minimum duration is low (2-5 seconds)
4. Try in incognito mode (browser extensions can block)

### "Recordings are blank/black screen"

1. This is usually a CORS issue
2. Check browser console for errors
3. Try different browser
4. Contact PostHog support (they're very responsive)

---

## ✅ Summary

**What you need to do**:
1. ✅ Deploy your code (git push)
2. ✅ Enable Session Replay in PostHog (1 toggle)
3. ✅ Wait 5 minutes
4. ✅ Start analyzing!

**Everything else is already set up and will work automatically!** 🚀

No configuration files, no environment variables, no dashboard setup needed - I did all of that for you.

**Your next step**: Deploy and watch the data flow in! 📊

