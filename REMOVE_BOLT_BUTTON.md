# How to Remove "Made in Bolt" Button

If you see a "Made in Bolt" button or watermark in your deployed app, follow these steps:

## Method 1: CSS (Quick Fix)

Add this CSS to your `src/index.css` file at the bottom:

```css
/* Hide any Bolt.new watermarks or buttons */
[data-bolt-watermark],
[class*="bolt-watermark"],
[class*="made-in-bolt"],
a[href*="bolt.new"] {
  display: none !important;
  visibility: hidden !important;
  opacity: 0 !important;
  pointer-events: none !important;
}
```

## Method 2: JavaScript (More thorough)

Add this script to the end of your `src/main.tsx` file:

```typescript
// Remove any Bolt watermarks
if (typeof window !== 'undefined') {
  const removeBoltElements = () => {
    const selectors = [
      '[data-bolt-watermark]',
      '[class*="bolt-watermark"]',
      '[class*="made-in-bolt"]',
      'a[href*="bolt.new"]'
    ];

    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });
  };

  // Run on load
  window.addEventListener('load', removeBoltElements);

  // Run after a delay to catch late-loading elements
  setTimeout(removeBoltElements, 1000);
  setTimeout(removeBoltElements, 3000);
}
```

## Method 3: Check index.html

Open your `public/index.html` or `index.html` and look for any:
- `<a>` tags linking to bolt.new
- Elements with "bolt" in their class names
- Script tags that might inject watermarks

Delete those lines entirely.

## Method 4: Production Build

The production build in the `dist` folder should be clean. If you still see Bolt branding:

1. Delete the `dist` folder
2. Run `npm run build` again
3. Deploy the new `dist` folder

## Verification

After deployment, inspect your live site:
1. Right-click and "Inspect Element"
2. Search for "bolt" in the HTML
3. If found, remove those elements using the methods above

Your app is 100% yours - no Bolt branding should appear in production!
