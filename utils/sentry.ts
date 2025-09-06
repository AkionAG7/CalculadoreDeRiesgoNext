import * as Sentry from '@sentry/nextjs'

// Custom error tracking for risk operations
export const trackRiskOperation = (
  operation: 'create' | 'update' | 'delete' | 'calculate',
  riskData?: any,
  error?: Error
) => {
  if (error) {
    Sentry.captureException(error, {
      tags: {
        operation: 'risk_operation',
        risk_operation_type: operation,
        component: 'RiskCalculator',
      },
      contexts: {
        risk: {
          operation,
          riskData: riskData ? JSON.stringify(riskData) : 'undefined',
        },
      },
    })
  } else {
    Sentry.addBreadcrumb({
      category: 'risk_operation',
      message: `Risk ${operation} operation completed`,
      level: 'info',
      data: {
        operation,
        riskData: riskData ? JSON.stringify(riskData) : 'undefined',
        timestamp: new Date().toISOString(),
      },
    })
  }
}

// Performance monitoring for risk calculations
export const trackRiskCalculation = (
  impact: string,
  probability: string,
  result: string,
  duration: number
) => {
  Sentry.addBreadcrumb({
    category: 'performance',
    message: 'Risk calculation completed',
    level: 'info',
    data: {
      impact,
      probability,
      result,
      duration: `${duration}ms`,
      timestamp: new Date().toISOString(),
    },
  })

  // Track custom events (metrics alternative)
  Sentry.captureMessage('Risk calculation completed', {
    level: 'info',
    tags: {
      impact,
      probability,
      result,
    },
    extra: {
      duration,
      calculation_type: 'risk_assessment',
    },
  }) 
}

// User action tracking
export const trackUserAction = (
  action: string,
  details?: Record<string, any>
) => {
  Sentry.addBreadcrumb({
    category: 'user_action',
    message: `User performed: ${action}`,
    level: 'info',
    data: {
      action,
      details: details ? JSON.stringify(details) : 'undefined',
      timestamp: new Date().toISOString(),
    },
  })
}

// Local storage error tracking
export const trackLocalStorageError = (
  operation: 'read' | 'write',
  error: Error,
  key?: string
) => {
  Sentry.captureException(error, {
    tags: {
      operation: 'local_storage',
      storage_operation: operation,
      component: 'RiskCalculator',
    },
    contexts: {
      storage: {
        operation,
        key,
        error: error.message,
      },
    },
  })
}

// Form validation error tracking
export const trackFormValidationError = (
  field: string,
  value: any,
  validationRule: string
) => {
  Sentry.addBreadcrumb({
    category: 'validation',
    message: `Form validation failed for field: ${field}`,
    level: 'warning',
    data: {
      field,
      value: typeof value === 'string' ? value : JSON.stringify(value),
      validationRule,
      timestamp: new Date().toISOString(),
    },
  })
}

// Set user context for better error tracking
export const setUserContext = (userId?: string, userEmail?: string) => {
  if (userId || userEmail) {
    Sentry.setUser({
      id: userId,
      email: userEmail,
    })
  }
}

// Set custom context for risk calculations
export const setRiskContext = (riskCount: number, lastRiskDate?: Date) => {
  Sentry.setContext('risk_management', {
    total_risks: riskCount,
    last_risk_date: lastRiskDate?.toISOString(),
    environment: process.env.NODE_ENV || 'development',
  })
}
