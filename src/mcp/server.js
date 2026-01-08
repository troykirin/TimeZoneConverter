/**
 * MCP Server for Application State Inspection
 * Provides agents with visibility into the current state of the web app
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListResourcesRequestSchema,
  ReadResourceRequestSchema,
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";

// Global state store (will be updated by the web app)
let appState = {
  initialized: false,
  timestamp: new Date().toISOString(),
  components: [],
  dom: null,
  userAgent: null,
};

// Create server instance
const server = new Server(
  {
    name: "timezoneconverter-app-state",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: "state://app/current",
        name: "Current App State",
        description: "Returns the current state of the web application",
        mimeType: "application/json",
      },
      {
        uri: "state://app/dom",
        name: "DOM Structure",
        description: "Returns the current DOM structure",
        mimeType: "text/html",
      },
      {
        uri: "state://app/components",
        name: "Active Components",
        description: "Lists all currently rendered components",
        mimeType: "application/json",
      },
    ],
  };
});

// Read resource content
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const uri = request.params.uri;

  switch (uri) {
    case "state://app/current":
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(appState, null, 2),
          },
        ],
      };

    case "state://app/dom":
      return {
        contents: [
          {
            uri,
            mimeType: "text/html",
            text: appState.dom || "<div>No DOM captured yet</div>",
          },
        ],
      };

    case "state://app/components":
      return {
        contents: [
          {
            uri,
            mimeType: "application/json",
            text: JSON.stringify(appState.components, null, 2),
          },
        ],
      };

    default:
      throw new Error(`Unknown resource: ${uri}`);
  }
});

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: "get_app_state",
        description: "Retrieve current application state",
        inputSchema: {
          type: "object",
          properties: {
            component: {
              type: "string",
              description: "Optional: specific component to query",
            },
          },
        },
      },
      {
        name: "inspect_element",
        description: "Inspect a specific DOM element by selector",
        inputSchema: {
          type: "object",
          properties: {
            selector: {
              type: "string",
              description: "CSS selector for the element",
            },
          },
          required: ["selector"],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  switch (name) {
    case "get_app_state": {
      if (args.component) {
        const component = appState.components.find(
          (c) => c.name === args.component
        );
        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(component || "Component not found", null, 2),
            },
          ],
        };
      }
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(appState, null, 2),
          },
        ],
      };
    }

    case "inspect_element": {
      // This would need to be implemented with actual DOM querying
      // For now, return a placeholder
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                selector: args.selector,
                note: "Element inspection requires runtime implementation",
              },
              null,
              2
            ),
          },
        ],
      };
    }

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("TimeZoneConverter MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});

// Export for potential use in other modules
export { appState, server };
