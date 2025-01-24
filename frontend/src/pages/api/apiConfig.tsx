interface EnvironmentConfig {
    API_URL: string;
    SOCKET_URL: string;
  }
  
  interface Endpoints {
    auth: string;
    users: string;
    products: string;
  }
  
  const API_CONFIG = {
    // 1. Using environment variables (recommended)
    BASE_URL: process.env.NEXT_PUBLIC_API_URL || "https://localhost:7234",
  
    // 2. Environment-specific URLs
    development: {
      API_URL: "https://localhost:7234/api",
      SOCKET_URL: "ws://localhost:7234",
    } as EnvironmentConfig,
    production: {
      API_URL: "https://api.production.com/api",
      SOCKET_URL: "wss://api.production.com",
    } as EnvironmentConfig,
  
    // Helper method to get current environment
    getEnvironment(): "development" | "production" {
      return (process.env.NODE_ENV as "development" | "production") || "development";
    },
  
    // Get the appropriate URL based on environment
    getApiUrl(): string {
      const env = this.getEnvironment();
      return this[env].API_URL;
    },
  
    // Construct full endpoint URLs
    endpoints: {
      auth: "/Auth",
      users: "/users",
      products: "/products",
    } as Endpoints,
  
    // Helper to construct full URLs
    getFullUrl(endpoint: keyof Endpoints): string {
      return `${this.getApiUrl()}${this.endpoints[endpoint]}`;
    },
  };
  
  export default API_CONFIG;
  