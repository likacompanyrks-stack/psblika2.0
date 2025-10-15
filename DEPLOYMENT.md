# Deployment Guide

## Quick Deploy to GitHub Pages

1. **Build the project**:
```bash
npm install
npm run build
```

2. **Deploy to GitHub Pages**:
   - Go to your repository settings
   - Navigate to Pages section
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch (or create one)
   - Upload the contents of the `dist` folder

## Deploy to Cloudflare Pages

1. **Push your code to GitHub**

2. **Connect to Cloudflare Pages**:
   - Go to [Cloudflare Pages](https://pages.cloudflare.com/)
   - Click "Create a project"
   - Connect your GitHub repository
   - Configure build settings:
     - **Build command**: `npm run build`
     - **Build output directory**: `dist`
     - **Root directory**: `/`
   - Click "Save and Deploy"

## Deploy to Vercel

```bash
npm install -g vercel
vercel
```

Follow the prompts and Vercel will automatically deploy your app.

## Deploy to Netlify

1. **Using Netlify CLI**:
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

2. **Using Netlify Dashboard**:
   - Go to [Netlify](https://netlify.com)
   - Drag and drop the `dist` folder

## Custom Static Server

Upload the contents of `dist` folder to any web server. Make sure:
- The server serves `index.html` for all routes
- HTTPS is enabled (required for camera access)
- Proper MIME types are set

## Testing Locally

```bash
npm run preview
```

This will serve the production build locally for testing.

## PWA Installation on iPhone

After deployment:
1. Open the app in Safari on iPhone
2. Tap the Share button
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add"

The app will now work like a native app with offline support!

## Important Notes

- **HTTPS Required**: Camera access requires HTTPS. All major hosting providers support this automatically.
- **Service Worker**: The app registers a service worker for offline functionality.
- **localStorage**: User data is stored locally in the browser.
- **No Backend**: This is a 100% client-side app with no server requirements.
