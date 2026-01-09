# Architecture Overview

This document explains the architectural decisions and structure of the TimeZone Converter web app.

## Design Principles

### 1. **Modular Architecture**
- Components are isolated and reusable
- Clear separation of concerns
- Easy to add, remove, or replace modules

### 2. **Mobile-First**
- Responsive design starts with mobile
- Progressive enhancement for larger screens
- Touch-optimized interactions

### 3. **iOS Safari Optimization**
- Safe area insets for notches/home indicators
- Proper viewport configuration
- PWA support with standalone mode
- Touch target sizing (44x44px minimum)

### 4. **MCP Integration**
- Agent visibility into application state
- Real-time state reporting
- Non-invasive monitoring

### 5. **Migration Ready**
- Structure supports Next.js/Nuxt conversion
- Framework-agnostic component patterns
- Minimal coupling to build tools

## Directory Structure

```
TimeZoneConverter/
│
├── src/                      # Source code
│   ├── components/          # React components
│   │   ├── App.jsx         # Main app (replace with yours)
│   │   └── index.js        # Component exports
│   │
│   ├── styles/             # Stylesheets
│   │   └── index.css       # Global styles
│   │
│   ├── utils/              # Utility functions
│   │   ├── config.js       # Environment configuration
│   │   ├── device.js       # Device detection
│   │   └── index.js        # Utility exports
│   │
│   ├── mcp/                # MCP integration
│   │   ├── client.js       # Web app side
│   │   └── server.js       # Agent side
│   │
│   ├── index.jsx           # App entry point
│   └── server.js           # Dev server
│
├── public/                  # Static assets
│   ├── icons/              # App icons
│   ├── manifest.json       # PWA manifest
│   └── service-worker.js   # Service worker
│
├── index.html              # HTML entry
├── package.json            # Dependencies
├── jsconfig.json           # JS/JSX configuration
├── mcp.config.json         # MCP server config
├── .env.example            # Environment template
├── .bun-version            # Bun version lock
├── .gitignore              # Git ignore rules
├── README.md               # Main documentation
├── QUICKSTART.md           # Quick start guide
└── CONTRIBUTING.md         # Contribution guide
```

## Key Components

### Entry Point (`src/index.jsx`)
- Initializes React app
- Mounts to DOM
- Configures MCP client
- Registers service worker (PWA)

### Main App (`src/components/App.jsx`)
- Placeholder component
- **Replace this with your implementation**
- Demonstrates MCP registration
- Shows responsive layout

### Development Server (`src/server.js`)
- Bun-based HTTP server
- Serves static files
- Hot reload support
- Development mode only

### MCP Client (`src/mcp/client.js`)
- Runs in the web app
- Captures application state
- Reports to MCP server
- Periodic updates (1s interval)

### MCP Server (`src/mcp/server.js`)
- Runs independently
- Exposes state to agents
- Provides tools and resources
- Follows MCP protocol

## Styling Approach

### CSS Variables
All colors, spacing, and typography defined as CSS variables:
```css
:root {
  --color-primary: #007aff;
  --spacing-md: 1rem;
  --font-family: -apple-system, ...;
}
```

### Mobile-First
Base styles target mobile, enhanced for larger screens:
```css
/* Mobile first */
.container { padding: 1rem; }

/* Tablet and up */
@media (min-width: 768px) {
  .container { padding: 2rem; }
}
```

### Dark Mode
Automatic dark mode via `prefers-color-scheme`:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-background: #000000;
    --color-text: #ffffff;
  }
}
```

### iOS Safari Safe Areas
Respects device notches and home indicators:
```css
body {
  padding-top: env(safe-area-inset-top);
  padding-bottom: env(safe-area-inset-bottom);
}
```

## MCP Integration Details

### Purpose
Allow AI agents to:
- Inspect current application state
- View DOM structure
- Track active components
- Query viewport information

### How It Works

1. **Web App Side** (`mcp/client.js`):
   - Captures state periodically
   - Stores in sessionStorage
   - Registers/unregisters components
   - Non-blocking background process

2. **Server Side** (`mcp/server.js`):
   - Runs as separate process
   - Implements MCP protocol
   - Exposes resources and tools
   - Responds to agent queries

3. **Communication**:
   - Currently: sessionStorage (dev)
   - Production: WebSocket/HTTP API
   - Configurable via `mcp.config.json`

### Resources Exposed

- `state://app/current` - Full application state
- `state://app/dom` - DOM structure snapshot
- `state://app/components` - Active components list

### Tools Available

- `get_app_state` - Query specific component state
- `inspect_element` - Examine DOM element by selector

## Environment Configuration

### Variables

Defined in `.env`:
```bash
APP_NAME=TimeZoneConverter
APP_PORT=3000
APP_ENV=development
MCP_ENABLED=true
MCP_SERVER_URL=http://localhost:8080
ENABLE_PWA=true
ENABLE_ANALYTICS=false
```

### Access in Code

```javascript
import { config } from './utils/config.js';

console.log(config.appPort); // 3000
console.log(config.mcp.enabled); // true
```

## PWA Configuration

### Manifest (`public/manifest.json`)
- App name and description
- Icons (multiple sizes)
- Display mode: standalone
- Orientation: portrait-primary
- Theme colors

### Service Worker (`public/service-worker.js`)
- Caches key resources
- Offline support
- Cache-first strategy
- Version-based cache invalidation

### iOS Meta Tags (`index.html`)
```html
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="apple-mobile-web-app-title" content="TimeZone Converter">
```

## Device Detection

### Utility (`utils/device.js`)

Provides functions to detect:
- iOS devices
- Safari browser
- Mobile vs tablet vs desktop
- Standalone mode (PWA)
- Viewport dimensions
- Pixel ratio

Example:
```javascript
import { device } from './utils/device.js';

if (device.isIOSSafari()) {
  // iOS Safari specific handling
}
```

## Build Process

### Development
```bash
bun run dev
```
- Starts Bun dev server
- Port: 3000 (configurable)
- Hot reload enabled
- Source maps included

### Production
```bash
bun run build
```
- Minifies code
- Bundles dependencies
- Outputs to `./dist/`
- Optimizes assets

## Migration Paths

### To Next.js

1. **Install Next.js**
   ```bash
   bun add next react react-dom
   ```

2. **Restructure**
   - Move components to `app/` or `pages/`
   - Add `layout.jsx` / `page.jsx`
   - Update imports

3. **Leverage Next.js Features**
   - Server components
   - Image optimization
   - Built-in routing
   - API routes

### To Nuxt

1. **Install Nuxt**
   ```bash
   bunx nuxi@latest init
   ```

2. **Convert Components**
   - JSX → Vue SFC
   - React hooks → Composition API
   - Component patterns

3. **Leverage Nuxt Features**
   - Auto-imports
   - File-based routing
   - Server-side rendering
   - Nuxt modules

## Performance Considerations

### Bundle Size
- React 18: ~50KB gzipped
- Minimal dependencies
- Tree-shaking enabled
- Code splitting ready

### Loading Strategy
- Async component loading
- Service worker caching
- Resource hints
- Lazy loading images

### Mobile Optimization
- Touch targets ≥44px
- Debounced events
- Reduced animations
- Optimized assets

## Security

### Best Practices
- No inline scripts (CSP ready)
- Environment variables for secrets
- HTTPS required for PWA
- Service worker scope limited

### MCP Security
- State data is read-only
- No code execution from agents
- Local-only by default
- Auth token support ready

## Testing Strategy

### Unit Tests
- Component logic
- Utility functions
- MCP client/server

### Integration Tests
- Component interactions
- MCP communication
- Service worker

### E2E Tests
- User flows
- PWA installation
- Mobile interactions

### Manual Testing
- iOS Safari
- Android Chrome
- Desktop browsers
- PWA standalone mode

## Future Enhancements

### Planned Features
- State management (Zustand/Redux)
- Routing (React Router)
- API client layer
- Component library integration
- Testing infrastructure
- CI/CD pipelines
- Analytics integration
- Error tracking

### Framework Migration
- Next.js conversion guide
- Nuxt conversion guide
- Server-side rendering
- Static site generation

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev)
- [MCP Protocol](https://modelcontextprotocol.io)
- [PWA Guidelines](https://web.dev/progressive-web-apps/)
- [iOS Web Apps](https://developer.apple.com/design/human-interface-guidelines/ios-web-apps)

---

**Note:** This is a scaffolding project. Customize and extend it according to your needs!
