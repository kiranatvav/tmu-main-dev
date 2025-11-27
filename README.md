This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Environment Configuration

Create a `.env.local` file in the root directory with the following variables:

```bash
# GoHighLevel API Configuration
GH_API_KEY=your_gohighlevel_api_key_here
GHL_LOCATION_ID=your_location_id_here

# Development Mode (optional)
# Set to "true" to skip GoHighLevel integration during development/testing
# When enabled, the lead form will proceed directly to the movie page without sending data to GHL
DEV_MODE=false
```

### Development Mode

When `DEV_MODE=true` is set:

- Lead form submissions skip GoHighLevel API calls
- Form proceeds directly to the movie page
- Lead data is logged to console for debugging
- Useful for testing the funnel flow without API dependencies

**Note:** Calendar URLs are hardcoded in the application and automatically selected based on user geo-location (US/Canada vs Rest of World).

## Getting Started

First, run the development server:

```bash
npm i
# then
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

### Feedback Shri

Page 1:

- 60 second teaser
- input form same height, logo in center
- auto play trailer
- click to play sound banner
- video first on mobile with some floating button to get access

Page 2:

- block navigation direcly & same for book
- click to play sound
- CTA text and subtext below logo
  banner on top - black friday sale, lifetime membership 33% off lack friday deal: The Matrix Unlocked Lifetime Membership, 33% discount, until 30th November (static)

Page 3:

- Geo calendar
  - The Matrix Unlocked - Louis: US & Canada
  - The Matrix Unlocked - Mert Or Bora: Rest of the World

Black friday banner at top

Click to turn on sound (which dissapears)
