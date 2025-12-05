# Boopydoop Landing Page

A beautiful, high-converting landing page for Boopydoop — the AI admin assistant.

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deploy to Vercel (Recommended)

1. Push this folder to a GitHub repository
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repo
5. Click "Deploy"

Done! You'll get a URL like `boopydoop.vercel.app`

## Deploy to Netlify

1. Push this folder to a GitHub repository
2. Go to [netlify.com](https://netlify.com)
3. Click "Add new site" → "Import an existing project"
4. Connect your GitHub repo
5. Build command: `npm run build`
6. Publish directory: `dist`
7. Click "Deploy"

## Deploy Manually

```bash
# Build the site
npm run build

# The `dist` folder contains your static site
# Upload it to any static hosting service
```

## Project Structure

```
boopydoop-site/
├── index.html          # HTML entry point
├── package.json        # Dependencies
├── vite.config.js      # Vite configuration
├── tailwind.config.js  # Tailwind configuration
├── postcss.config.js   # PostCSS configuration
├── public/
│   └── favicon.svg     # Site favicon
└── src/
    ├── main.jsx        # React entry point
    ├── App.jsx         # Landing page component
    └── index.css       # Global styles + Tailwind
```

## Customization

### Change Colors
Edit `tailwind.config.js` to customize the color palette.

### Change Copy
Edit `src/App.jsx` to update text, pricing, and features.

### Add Analytics
Add your analytics script to `index.html` before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Connect Waitlist Form
Replace the `handleSubmit` function in `src/App.jsx` with your email service:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  // Example: Send to your API
  await fetch('https://your-api.com/waitlist', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  
  setSubmitted(true);
};
```

## Tech Stack

- **Vite** — Fast build tool
- **React 18** — UI framework
- **Tailwind CSS** — Styling
- **No external dependencies** — All icons are inline SVGs

## License

MIT
