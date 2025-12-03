# vturb Player Styling Notes

## Current Status (Nov 30, 2025)

The vturb player is currently used on both the home page and movie page with **simplified, unstyled containers** due to layout compatibility issues.

## Issue

The vturb VideoPlayer component does not work well with custom container styling, specifically:

1. **Rounded borders** (`rounded-4xl`, `overflow-hidden`) - Causes layout conflicts
2. **Signature overlay** (TMU logo + Frank Warrink signature) - Not compatible with vturb embed positioning
3. **Custom glass effect containers** - Interferes with vturb's internal styling

## Temporary Solution

### Home Page (`templates/funnel-page-template/index.tsx`)

**Current Implementation:**

- Simplified container with basic width/sizing only
- No rounded borders or overflow styling
- Signature overlay commented out
- Raw vturb embed used

**Commented Out:**

```tsx
// Removed from container:
// - overflow-hidden
// - rounded-4xl

// Signature overlay (lines ~95-110)
<div className="absolute bottom-3 md:bottom-8 right-3 md:right-8 z-20">
  {/* TMU logo and Frank Warrink signature */}
</div>
```

### Movie Page (`templates/movie-watch-template/index.tsx`)

**Current Implementation:**

- Already using vturb with basic container
- Rounded borders on container work better here due to different layout
- No overlay elements

## Original Custom Styling

The original design included:

1. **Rounded Container:**

   ```tsx
   <div className="... rounded-4xl overflow-hidden">
   ```

2. **Signature Overlay:**
   - TMU white logo (48px-72px)
   - "Frank Warrink" in Aguafina Script font
   - "Founder CEO, Visionary"
   - "The Matrix Unlocked"
   - Positioned: `absolute bottom-3 md:bottom-8 right-3 md:right-8`

3. **Glass Effect Background** (used with MovieVideoPlayer):
   ```tsx
   background: "rgba(255, 255, 255, 0.02)",
   backdropFilter: "blur(20px)",
   border: "1px solid rgba(255, 255, 255, 0.1)",
   boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
   ```

## Future Solutions

### Option 1: ReactVideoPlayer with CloudFront

When uncropped videos become available on CloudFront:

- Switch back to ReactVideoPlayer component
- Restore all custom styling (rounded borders, signature overlay)
- ReactVideoPlayer works well with custom container styling

### Option 2: vturb Styling Resolution

Investigate and fix vturb compatibility:

- Test different z-index configurations
- Use vturb player wrapper with custom styling
- Adjust positioning strategy for overlays
- May require modifications to VideoPlayer component

### Option 3: Alternative Video Player

Consider other video player options:

- Video.js with custom controls
- Plyr.io with styled wrapper
- Native HTML5 video with custom UI

## Code Locations

### Home Page Video Container

**File**: `templates/funnel-page-template/index.tsx`
**Lines**: ~85-115
**Status**: Simplified for vturb compatibility

### Movie Page Video Container

**File**: `templates/movie-watch-template/index.tsx`
**Lines**: ~112-120
**Status**: Using vturb with basic rounded container

### VideoPlayer Component

**File**: `components/organisms/video-player/index.tsx`
**Description**: vturb smartplayer wrapper component

### MovieVideoPlayer Component

**File**: `components/organisms/movie-video-player/index.tsx`
**Description**: Original styled component for SproutVideo (not currently used)

### ReactVideoPlayer Component

**File**: `components/organisms/react-video-player/index.tsx`
**Description**: CloudFront video player (commented out, waiting for uncropped videos)

## Restoration Steps

When ready to restore custom styling:

1. **Uncomment signature overlay** in funnel-page-template
2. **Add back styling classes**:
   - `overflow-hidden rounded-4xl` to container
3. **Test thoroughly** on all devices/browsers
4. **Verify** signature doesn't interfere with video controls

## Testing Checklist

When implementing styling changes:

- [ ] Desktop: Video displays correctly
- [ ] Mobile: Responsive layout works
- [ ] Tablet: Medium breakpoint looks good
- [ ] Signature overlay visible and positioned correctly
- [ ] Rounded borders render properly
- [ ] Video controls accessible
- [ ] Exit intent modal doesn't conflict
- [ ] Performance not impacted

## Related Documentation

- [PostHog Video Analytics Plan](./posthog-video-analytics-plan.md)
- [Sentry Vercel Guide](./sentry-vercel-guide.md)

---

**Last Updated**: November 30, 2025  
**Status**: Temporary simplified styling in use  
**Action Required**: Monitor for uncropped CloudFront videos or vturb styling solution
