# ps-LIKA Version 2.0 - Deployment Guide

## Pre-Deployment Checklist

✅ All features implemented
✅ Build successful (npm run build)
✅ No TypeScript errors
✅ All dependencies installed
✅ PWA manifest configured
✅ Service worker ready
✅ Icons in place

## Build Output

```
dist/
├── index.html (1.14 kB, gzipped: 0.53 kB)
├── assets/
│   ├── index--jnI40P-.css (17.21 kB, gzipped: 4.37 kB)
│   └── index-Bp1s5guy.js (465.28 kB, gzipped: 151.24 kB)
├── manifest.json
├── sw.js
├── icon-192.png
├── icon-512.png
└── vite.svg
```

## Deployment Options

### Option 1: GitHub Pages

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Deploy to GitHub Pages**:
   ```bash
   # If using gh-pages package
   npm install -g gh-pages
   gh-pages -d dist
   ```

3. **Configure GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Deploy from a branch
   - Branch: gh-pages / root
   - Save

4. **Access your app**:
   - URL: `https://[username].github.io/[repo-name]/`

### Option 2: Cloudflare Pages

1. **Connect repository**:
   - Go to Cloudflare Pages dashboard
   - Click "Create a project"
   - Connect your GitHub repository

2. **Configure build settings**:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 18 or higher

3. **Deploy**:
   - Click "Save and Deploy"
   - Cloudflare will build and deploy automatically

4. **Custom domain** (optional):
   - Go to Custom domains
   - Add your domain
   - Update DNS records

### Option 3: Vercel

1. **Install Vercel CLI** (optional):
   ```bash
   npm install -g vercel
   ```

2. **Deploy via CLI**:
   ```bash
   vercel
   ```

3. **Or use Vercel dashboard**:
   - Import your GitHub repository
   - Framework Preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

### Option 4: Netlify

1. **Deploy via CLI**:
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```

2. **Or use Netlify dashboard**:
   - New site from Git
   - Connect repository
   - Build command: `npm run build`
   - Publish directory: `dist`

### Option 5: Static Hosting (Apache/Nginx)

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload entire `dist/` folder contents to your web server
   - Ensure public folder permissions (755)

3. **Configure web server**:

   **Apache (.htaccess)**:
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx (nginx.conf)**:
   ```nginx
   location / {
     try_files $uri $uri/ /index.html;
   }
   ```

## Post-Deployment Testing

### Critical Tests
1. ✅ App loads correctly
2. ✅ Theme toggle works
3. ✅ Language toggle works
4. ✅ Camera scan works
5. ✅ Manual entry works
6. ✅ Product list displays
7. ✅ Excel export downloads
8. ✅ PWA installation works

### PWA Installation Test

**iOS Safari**:
1. Open app in Safari
2. Tap Share button
3. Look for "Add to Home Screen"
4. Verify icon and name (psLIKA)
5. Install and test offline

**Android Chrome**:
1. Open app in Chrome
2. Look for install prompt
3. Or use menu → "Add to Home Screen"
4. Verify icon and name
5. Install and test offline

### Performance Check
- Test on 3G/4G network
- Check load times
- Verify offline functionality
- Test on multiple devices

## Environment Variables

No environment variables needed for production build.

All configuration is in:
- `/public/manifest.json` - PWA settings
- `/public/sw.js` - Service worker
- `/index.html` - Meta tags

## HTTPS Requirement

⚠️ **IMPORTANT**: PWA features require HTTPS!

- Service workers only work over HTTPS
- Camera access requires HTTPS
- Install prompt requires HTTPS

**Exception**: localhost for development

## Custom Domain Setup

If using a custom domain:

1. **Update manifest.json**:
   ```json
   {
     "start_url": "https://yourdomain.com/",
     ...
   }
   ```

2. **Update service worker scope** (if needed)

3. **Configure SSL/TLS certificate**:
   - Use Let's Encrypt (free)
   - Or CloudFlare SSL
   - Or hosting provider SSL

## Monitoring

### Key Metrics to Monitor
- Page load time (< 2s)
- First contentful paint (< 1s)
- Time to interactive (< 2s)
- Error rate (< 1%)
- PWA install rate

### Recommended Tools
- Google Analytics
- Google Search Console
- Lighthouse CI
- WebPageTest
- Chrome DevTools

## Rollback Plan

If issues occur:

1. **Keep previous version**:
   ```bash
   git tag v1.0.0  # Tag old version
   git checkout v1.0.0  # Rollback if needed
   ```

2. **Deploy previous build**:
   - Keep old dist folder as backup
   - Deploy backup if v2 has issues

## Support

For deployment issues:
- Check browser console for errors
- Verify HTTPS is enabled
- Test service worker in DevTools
- Check manifest.json validation

---

**Version**: 2.0.0
**Last Updated**: 2025-10-15
**Build Size**: ~465 KB (151 KB gzipped)
**Recommended**: Cloudflare Pages or Vercel for best performance
