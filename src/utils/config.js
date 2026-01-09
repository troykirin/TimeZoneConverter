/**
 * Environment configuration utilities
 */

export const getEnv = (key, defaultValue = "") => {
  // Check browser environment first (import.meta.env for Vite/Bun)
  if (typeof import.meta !== "undefined" && import.meta.env) {
    return import.meta.env[key] ?? defaultValue;
  }
  // Fallback to Node.js environment
  if (typeof process !== "undefined" && process.env) {
    return process.env[key] ?? defaultValue;
  }
  return defaultValue;
};

export const isDevelopment = () => {
  return getEnv("APP_ENV", "development") === "development";
};

export const isProduction = () => {
  return getEnv("APP_ENV") === "production";
};

export const config = {
  appName: getEnv("APP_NAME", "TimeZoneConverter"),
  appPort: parseInt(getEnv("APP_PORT", "3000"), 10),
  appEnv: getEnv("APP_ENV", "development"),
  mcp: {
    enabled: getEnv("MCP_ENABLED", "true") === "true",
    serverUrl: getEnv("MCP_SERVER_URL", "http://localhost:8080"),
    apiKey: getEnv("MCP_API_KEY", ""),
  },
  features: {
    pwa: getEnv("ENABLE_PWA", "true") === "true",
    analytics: getEnv("ENABLE_ANALYTICS", "false") === "true",
  },
};

export default config;
