# Contributing to TimeZone Converter

Thank you for considering contributing to this project!

## Getting Started

1. Fork the repository
2. Clone your fork
3. Install dependencies: `bun install`
4. Create a feature branch: `git checkout -b feature/your-feature`
5. Make your changes
6. Test your changes: `bun run dev`
7. Commit your changes: `git commit -m "Add your feature"`
8. Push to your fork: `git push origin feature/your-feature`
9. Open a Pull Request

## Code Style

- Use modern JavaScript/JSX
- Follow existing code patterns
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

## Component Guidelines

- Place components in `src/components/`
- Export components in `src/components/index.js`
- Use functional components with hooks
- Register components with MCP client when appropriate

## CSS Guidelines

- Use CSS variables defined in `src/styles/index.css`
- Follow mobile-first responsive design
- Test on iOS Safari when possible
- Ensure touch targets are at least 44x44px

## MCP Integration

- Use `mcpClient.registerComponent()` for new components
- Update `mcp.config.json` for new MCP capabilities
- Test MCP server with agents when adding features

## Testing

- Add tests for new features
- Ensure existing tests pass
- Test on multiple devices and browsers

## Questions?

Feel free to open an issue for any questions or concerns!
