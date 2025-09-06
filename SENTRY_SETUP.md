# Sentry Integration Guide for Risk Calculator

## Overview

This project has been integrated with **Sentry** to provide comprehensive error monitoring, performance tracking, and user experience insights for the Risk Calculator application.

## What Sentry Provides

### 🚨 **Error Monitoring**
- **Real-time error tracking** across client and server
- **Automatic error capture** with full stack traces
- **Error grouping and deduplication**
- **Custom error contexts** for better debugging

### 📊 **Performance Monitoring**
- **Transaction tracing** for risk calculations
- **Custom metrics** for risk operations
- **Performance bottlenecks** identification
- **User experience metrics**

### 🎯 **User Experience Tracking**
- **User action breadcrumbs** for debugging
- **Session replay** for error reproduction
- **Custom user contexts** for personalized tracking
- **Form validation error tracking**

### 🔍 **Advanced Features**
- **Source map support** for production debugging
- **Environment-specific configuration**
- **Error filtering** and customization
- **Integration with development tools**

## Configuration Files

### 1. **sentry.client.config.ts**
- Browser-side error monitoring
- Session replay configuration
- Performance tracking setup
- Error filtering for development

### 2. **sentry.server.config.ts**
- Server-side error monitoring
- Node.js integration
- API error tracking

### 3. **sentry.edge.config.ts**
- Edge runtime error monitoring
- Middleware error tracking

### 4. **utils/sentry.ts**
- Custom error tracking functions
- Performance monitoring utilities
- User action tracking helpers

## Key Features Implemented

### 🎯 **Risk Operation Tracking**
```typescript
// Track risk creation, updates, and deletions
trackRiskOperation('create', riskData)
trackRiskOperation('update', { id, originalRisk, updatedData })
trackRiskOperation('delete', riskToDelete)
```

### ⚡ **Performance Monitoring**
```typescript
// Track risk calculation performance
trackRiskCalculation(impact, probability, result, duration)
```

### 👤 **User Action Tracking**
```typescript
// Track user interactions
trackUserAction('risk_created', { riskId, riskLevel })
trackUserAction('form_submitted', { formType: 'risk' })
```

### 🗄️ **Storage Error Tracking**
```typescript
// Track localStorage errors
trackLocalStorageError('read', error, 'risks')
trackLocalStorageError('write', error, 'risks')
```

## Error Boundary

The application includes a comprehensive **Error Boundary** component that:

- **Catches React errors** and prevents app crashes
- **Sends errors to Sentry** with full context
- **Provides user-friendly error messages** in Spanish
- **Offers recovery options** (retry, go home)
- **Shows error details** for debugging

## Environment Setup

### 1. **Create Environment File**
```bash
# Copy the example file
cp env.example .env.local

# Edit with your Sentry DSN
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn_here
SENTRY_DSN=your_sentry_dsn_here
```

### 2. **Sentry Project Setup**
1. Go to [Sentry.io](https://sentry.io)
2. Create a new project for Next.js
3. Copy your DSN from project settings
4. Update the configuration files

### 3. **Source Map Upload** (Optional)
```bash
# Install Sentry CLI
npm install -g @sentry/cli

# Configure source map upload
sentry-cli login
sentry-cli init
```

## Dashboard Features

### 📈 **Performance Dashboard**
- **Risk calculation metrics** by impact/probability
- **Operation duration histograms**
- **User interaction patterns**
- **Storage operation performance**

### 🚨 **Error Dashboard**
- **Error frequency** by type and component
- **User impact analysis**
- **Error resolution tracking**
- **Custom error contexts**

### 👥 **User Experience Dashboard**
- **User journey mapping**
- **Form completion rates**
- **Error recovery patterns**
- **Session replay analysis**

## Customization Options

### 🔧 **Error Filtering**
```typescript
// Customize which errors to send
beforeSend(event, hint) {
  // Filter out development errors
  if (process.env.NODE_ENV === 'development') {
    return null;
  }
  return event;
}
```

### 🏷️ **Custom Tags**
```typescript
// Add custom tags for better organization
Sentry.setTag('risk_level', 'critical')
Sentry.setTag('user_type', 'admin')
```

### 📝 **Custom Contexts**
```typescript
// Add custom context for better debugging
Sentry.setContext('risk_management', {
  total_risks: 15,
  last_risk_date: '2024-01-15',
  environment: 'production'
})
```

## Monitoring Best Practices

### 1. **Error Severity Levels**
- **Critical**: App crashes, data loss
- **Error**: Function failures, API errors
- **Warning**: Validation errors, performance issues
- **Info**: User actions, successful operations

### 2. **Performance Thresholds**
- **Risk calculation**: < 100ms
- **Data loading**: < 500ms
- **Form submission**: < 1s
- **Page navigation**: < 2s

### 3. **User Experience Metrics**
- **Error recovery rate**: > 90%
- **Form completion rate**: > 85%
- **Session duration**: > 5 minutes
- **User satisfaction**: > 4.5/5

## Troubleshooting

### 🔍 **Common Issues**

1. **Sentry not capturing errors**
   - Check DSN configuration
   - Verify environment variables
   - Check browser console for errors

2. **Performance data missing**
   - Ensure tracesSampleRate > 0
   - Check browser compatibility
   - Verify transaction setup

3. **Source maps not working**
   - Check build configuration
   - Verify Sentry CLI setup
   - Check authentication tokens

### 🛠️ **Debug Mode**
```typescript
// Enable debug mode in development
debug: process.env.NODE_ENV === 'development'
```

## Production Deployment

### 1. **Build Configuration**
```bash
# Build with Sentry integration
npm run build

# Upload source maps (optional)
npm run sentry:sourcemaps
```

### 2. **Environment Variables**
```bash
# Production environment
NODE_ENV=production
SENTRY_DSN=your_production_dsn
NEXT_PUBLIC_SENTRY_DSN=your_production_dsn
```

### 3. **Monitoring Setup**
- **Error alerts** for critical issues
- **Performance alerts** for slow operations
- **User experience alerts** for UX issues
- **Custom dashboards** for business metrics

## Support and Resources

- **Sentry Documentation**: [docs.sentry.io](https://docs.sentry.io)
- **Next.js Integration**: [docs.sentry.io/platforms/javascript/guides/nextjs](https://docs.sentry.io/platforms/javascript/guides/nextjs)
- **Community Forum**: [forum.sentry.io](https://forum.sentry.io)
- **GitHub Issues**: [github.com/getsentry/sentry-javascript](https://github.com/getsentry/sentry-javascript)

---

**Note**: This integration provides comprehensive monitoring while maintaining user privacy and data security. All sensitive information is filtered out before being sent to Sentry.
