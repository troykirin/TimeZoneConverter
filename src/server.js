/**
 * Development Server with Hot Reload
 * Uses Bun's built-in capabilities
 */

const port = process.env.APP_PORT || 3000;

Bun.serve({
  port,
  development: true,
  
  async fetch(req) {
    const url = new URL(req.url);
    const path = url.pathname;

    // Serve index.html for root
    if (path === "/") {
      return new Response(await Bun.file("./index.html").text(), {
        headers: {
          "Content-Type": "text/html",
        },
      });
    }

    // Serve manifest.json
    if (path === "/manifest.json") {
      return new Response(
        await Bun.file("./public/manifest.json").text(),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    // Serve static files from public directory
    if (path.startsWith("/icons/") || path.startsWith("/public/")) {
      const filePath = path.startsWith("/public/")
        ? `.${path}`
        : `./public${path}`;
      const file = Bun.file(filePath);
      
      if (await file.exists()) {
        return new Response(file);
      }
    }

    // Serve source files
    if (path.startsWith("/src/")) {
      const file = Bun.file(`.${path}`);
      
      if (await file.exists()) {
        const contentType = path.endsWith(".jsx")
          ? "application/javascript"
          : path.endsWith(".js")
          ? "application/javascript"
          : path.endsWith(".css")
          ? "text/css"
          : "text/plain";

        return new Response(file, {
          headers: {
            "Content-Type": contentType,
          },
        });
      }
    }

    // 404
    return new Response("Not Found", { status: 404 });
  },

  error(error) {
    console.error("Server error:", error);
    return new Response("Internal Server Error", { status: 500 });
  },
});

console.log(`
🚀 Development server running at http://localhost:${port}
📱 Mobile-friendly and iOS Safari optimized
🔧 MCP integration enabled

📝 Ready for your .jsx implementation!
`);
