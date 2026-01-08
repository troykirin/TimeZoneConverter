/**
 * Environment configuration utilities
 */

export const getEnv = (key, defaultValue = "") => {
  return import.meta.env?.[key] ?? process.env?.[key] ?? defaultValue;
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
