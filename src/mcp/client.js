/**
 * MCP Client Integration
 * Connects the web app to the MCP server for state reporting
 */

class MCPClient {
  constructor() {
    this.enabled = false;
    this.stateUpdateInterval = null;
    this.config = {
      updateIntervalMs: 1000, // Update state every second
      captureDOM: true,
      captureComponents: true,
    };
  }

  /**
   * Initialize MCP client
   */
  async init() {
    // Use config module for consistent environment variable handling
    const { config } = await import("../utils/config.js");
    
    if (!config.mcp.enabled) {
      console.log("MCP integration disabled");
      return;
    }

    this.enabled = true;
    console.log("MCP client initialized");
    
    // Start periodic state updates
    this.startStateUpdates();
  }

  /**
   * Start periodic state updates
   */
  startStateUpdates() {
    if (this.stateUpdateInterval) {
      clearInterval(this.stateUpdateInterval);
    }

    this.stateUpdateInterval = setInterval(() => {
      this.captureState();
    }, this.config.updateIntervalMs);
  }

  /**
   * Stop periodic state updates
   */
  stopStateUpdates() {
    if (this.stateUpdateInterval) {
      clearInterval(this.stateUpdateInterval);
      this.stateUpdateInterval = null;
    }
  }

  /**
   * Capture current application state
   */
  captureState() {
    const state = {
      timestamp: new Date().toISOString(),
      initialized: true,
      userAgent: navigator.userAgent,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight,
      },
      location: {
        href: window.location.href,
        pathname: window.location.pathname,
        search: window.location.search,
      },
    };

    if (this.config.captureDOM) {
      state.dom = document.documentElement.outerHTML;
    }

    if (this.config.captureComponents) {
      state.components = this.getActiveComponents();
    }

    // Store state (in production, this would send to MCP server)
    this.storeState(state);
    
    return state;
  }

  /**
   * Get list of active components
   */
  getActiveComponents() {
    const components = [];
    const root = document.getElementById("root");
    
    if (root) {
      const elements = root.querySelectorAll("[data-component]");
      elements.forEach((el) => {
        components.push({
          name: el.getAttribute("data-component"),
          id: el.id,
          classes: Array.from(el.classList),
        });
      });
    }

    return components;
  }

  /**
   * Store state (placeholder for MCP server communication)
   */
  storeState(state) {
    // In a full implementation, this would send state to the MCP server
    // For now, we'll store it in sessionStorage for debugging
    try {
      sessionStorage.setItem("mcp_app_state", JSON.stringify(state));
    } catch (e) {
      console.warn("Could not store MCP state:", e);
    }
  }

  /**
   * Register a component
   */
  registerComponent(name, metadata = {}) {
    console.log(`[MCP] Registered component: ${name}`, metadata);
  }

  /**
   * Unregister a component
   */
  unregisterComponent(name) {
    console.log(`[MCP] Unregistered component: ${name}`);
  }

  /**
   * Get current state
   */
  getState() {
    try {
      const stored = sessionStorage.getItem("mcp_app_state");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }
}

// Export singleton instance
export const mcpClient = new MCPClient();
export default mcpClient;
