# Quick Start Guide

Get your TimeZone Converter web app running in minutes!

## Prerequisites

Make sure you have [Bun](https://bun.sh) installed:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Installation

1. **Install dependencies:**
   ```bash
   bun install
   ```

2. **Set up environment variables (optional):**
   ```bash
   cp .env.example .env
   # Edit .env with your preferred settings
   ```

## Development

Start the development server:

```bash
bun run dev
```

Your app will be running at **http://localhost:3000** 🚀

The server includes:
- ✅ Hot reload
- ✅ Mobile-friendly
- ✅ iOS Safari optimized
- ✅ MCP integration enabled

## Next Steps

### 1. Add Your Custom .jsx File

Replace `src/components/App.jsx` with your own component:

```jsx
import React from "react";

function App() {
  return (
    <div className="app">
      <h1>My Custom App</h1>
      {/* Your code here */}
    </div>
  );
}

export default App;
```

### 2. Add New Components

Create new components in `src/components/`:

```bash
# Create a new component
touch src/components/MyComponent.jsx
```

Then export it in `src/components/index.js`:

```javascript
export { default as MyComponent } from "./MyComponent.jsx";
```

### 3. Customize Styles

Edit `src/styles/index.css` or add new CSS files:

- CSS variables are defined at the top
- Mobile-first responsive design
- Dark mode support included
- iOS Safari safe areas configured

### 4. Test on Mobile

Open on your phone: `http://your-local-ip:3000`

For iOS:
- Open in Safari
- Tap Share → Add to Home Screen
- Launch as standalone app

## Building for Production

Build your app:

```bash
bun run build
```

Output will be in `./dist/` directory.

## MCP Integration

The MCP (Model Context Protocol) server allows AI agents to see your app's state.

### Start MCP Server

```bash
bun run src/mcp/server.js
```

### Features

- Real-time app state inspection
- DOM structure visibility
- Component tracking
- Viewport and device info

## Project Structure

```
TimeZoneConverter/
├── src/
│   ├── components/    # React components
│   ├── styles/       # CSS styles
│   ├── utils/        # Utility functions
│   └── mcp/          # MCP integration
├── public/           # Static assets
├── index.html        # Entry HTML
└── package.json      # Dependencies
```

## Common Issues

### Port Already in Use

Change the port in `.env`:
```
APP_PORT=3001
```

### Dependencies Not Installing

Try clearing Bun's cache:
```bash
rm -rf node_modules bun.lockb
bun install
```

### iOS Safari Not Working

Make sure you:
1. Added icons to `public/icons/`
2. Updated `manifest.json` with correct paths
3. Opened in Safari (not Chrome)

## Migration to Next.js/Nuxt

This scaffold is designed for easy migration:

### To Next.js
1. Move to Next.js directory structure
2. Update imports and routing
3. Leverage SSR capabilities

### To Nuxt
1. Convert components to Vue
2. Update to Nuxt directory structure
3. Use Nuxt auto-imports

## Resources

- 📖 [Full README](README.md)
- 🤝 [Contributing Guide](CONTRIBUTING.md)
- 🔧 [Bun Documentation](https://bun.sh/docs)
- ⚛️ [React Documentation](https://react.dev)

---

**Ready to build!** 🎉

Start by replacing `src/components/App.jsx` with your own implementation.
