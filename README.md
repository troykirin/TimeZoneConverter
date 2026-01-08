# TimeZone Converter

A modern, modular .jsx web application built with Bun, featuring MCP (Model Context Protocol) integration for agent visibility and optimized for mobile and iOS Safari.

## 🚀 Features

- ✅ **Bun Runtime** - Fast JavaScript runtime and package manager
- ✅ **Modular Architecture** - Clean component-based structure
- ✅ **MCP Integration** - Agent visibility into application state
- ✅ **Mobile-First Design** - Responsive layouts optimized for all devices
- ✅ **iOS Safari Optimized** - Safe areas, touch targets, and PWA support
- ✅ **PWA Ready** - Progressive Web App with offline support
- ✅ **React JSX** - Modern React 18 with JSX support
- ✅ **Easy Migration** - Ready to convert to Next.js or Nuxt when needed

## 📁 Project Structure

```
TimeZoneConverter/
├── public/                    # Static assets
│   ├── manifest.json         # PWA manifest
│   ├── service-worker.js     # Service worker for offline support
│   └── icons/                # App icons (add your icons here)
├── src/
│   ├── components/           # React components
│   │   ├── App.jsx          # Main app component (replace with your own)
│   │   └── index.js         # Component exports
│   ├── styles/              # CSS styles
│   │   └── index.css        # Global styles with mobile-first design
│   ├── utils/               # Utility functions
│   │   ├── config.js        # Environment configuration
│   │   ├── device.js        # Device detection utilities
│   │   └── index.js         # Utility exports
│   ├── mcp/                 # MCP integration
│   │   ├── client.js        # MCP client for state reporting
│   │   └── server.js        # MCP server for agent queries
│   ├── index.jsx            # Application entry point
│   └── server.js            # Development server
├── index.html               # HTML entry point with iOS meta tags
├── mcp.config.json          # MCP server configuration
├── package.json             # Dependencies and scripts
├── .env.example             # Environment variables template
└── .bun-version             # Bun version lock

```

## 🛠️ Setup

### Prerequisites

- [Bun](https://bun.sh) >= 1.0.0

### Installation

1. Install dependencies:
```bash
bun install
```

2. Copy environment configuration:
```bash
cp .env.example .env
```

3. Edit `.env` with your settings (optional)

## 🚦 Development

Start the development server with hot reload:

```bash
bun run dev
```

The app will be available at `http://localhost:3000`

## 🏗️ Building

Build for production:

```bash
bun run build
```

The built files will be in the `./dist` directory.

## 📱 Mobile & iOS Safari

This project is optimized for mobile devices and iOS Safari:

- **Safe Areas**: Respects iOS notches and home indicators
- **Touch Targets**: Minimum 44x44px touch targets
- **Viewport**: Proper viewport configuration for mobile
- **PWA**: Add to home screen support
- **Meta Tags**: iOS-specific meta tags for web apps
- **Responsive**: Mobile-first CSS with breakpoints
- **Dark Mode**: Automatic dark mode support

## 🤖 MCP Integration

The project includes Model Context Protocol (MCP) integration to give AI agents visibility into the application state.

### Starting the MCP Server

```bash
bun run src/mcp/server.js
```

### MCP Features

- **State Inspection**: Agents can query current app state
- **DOM Access**: View current DOM structure
- **Component Tracking**: List active components
- **Real-time Updates**: State updates captured periodically

### Configuration

Edit `mcp.config.json` to customize MCP behavior.

## 🎨 Customization

### Adding Your JSX Component

Replace `src/components/App.jsx` with your own component:

```jsx
import React from "react";
import { mcpClient } from "../mcp/client.js";

function App() {
  // Your component code here
  return <div>Your App</div>;
}

export default App;
```

### Adding New Components

Create components in `src/components/` and export them in `index.js`:

```javascript
export { default as MyComponent } from "./MyComponent.jsx";
```

### Styling

- Global styles: `src/styles/index.css`
- CSS variables for theming
- Mobile-first approach
- Automatic dark mode support

## 🔄 Migration Path

This project is designed to be easily convertible to:

### Next.js

The modular structure aligns with Next.js conventions. Key changes needed:
- Move pages to `pages/` or `app/` directory
- Update routing
- Use Next.js image optimization
- Leverage server-side rendering

### Nuxt

The component structure works well with Nuxt. Key changes needed:
- Move to Nuxt directory structure
- Update to Vue composition API or Options API
- Use Nuxt auto-imports
- Leverage SSR capabilities

## 🧪 Testing

Add tests as you develop:

```bash
bun test
```

## 📦 Scripts

- `bun run dev` - Start development server with hot reload
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run preview` - Preview production build

## 📄 License

MIT

## 🤝 Contributing

This is a scaffolding project ready for your custom implementation. Add your features and components as needed!

## 📚 Resources

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev)
- [MCP Protocol](https://modelcontextprotocol.io)
- [iOS Safari Web Apps](https://developer.apple.com/design/human-interface-guidelines/ios-web-apps)
- [PWA Guidelines](https://web.dev/progressive-web-apps/)

---

**Ready to build!** Start by replacing the placeholder App.jsx with your custom implementation.