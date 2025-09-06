import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://d123ebfd14de5e2ae1ece5949dda5b2b@o4509933527302144.ingest.us.sentry.io/4509933528743936",
  
  // Performance Monitoring
  tracesSampleRate: 1.0,
  
  // Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  
  // Environment
  environment: process.env.NODE_ENV || "development",
  
  // Enable debug mode in development
  debug: process.env.NODE_ENV === "development",
  
  // Before send function to filter out certain errors
  beforeSend(event, hint) {
    // Allow localhost errors in development for testing
    // if (process.env.NODE_ENV === "development" && window.location.hostname === "localhost") {
    //   return null;
    // }
    
    // Filter out certain error types if needed
    if (event.exception) {
      const exception = event.exception.values?.[0];
      if (exception?.type === "ChunkLoadError") {
        return null; // Don't send chunk loading errors
      }
    }
    
    return event;
  },
  
  // Integrations
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
});
