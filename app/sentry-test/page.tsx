'use client'

import { useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { 
  trackRiskOperation, 
  trackRiskCalculation, 
  trackUserAction, 
  trackLocalStorageError,
  trackFormValidationError,
  setUserContext,
  setRiskContext
} from '../../utils/sentry'

export default function SentryTestPage() {
  const [testResults, setTestResults] = useState<string[]>([])

  const addResult = (result: string) => {
    setTestResults(prev => [...prev, `${new Date().toLocaleTimeString()}: ${result}`])
  }

  const testBasicError = () => {
    try {
      addResult('🧪 Testing basic error capture...')
      throw new Error('Test error for Sentry integration - Basic Error Test')
    } catch (error) {
      Sentry.captureException(error)
      addResult('✅ Basic error sent to Sentry')
    }
  }

  const testCustomError = () => {
    try {
      addResult('🧪 Testing custom error with context...')
      const error = new Error('Custom risk calculation error')
      error.name = 'RiskCalculationError'
      trackRiskOperation('calculate', { impact: 'Alto', probability: 'Media' }, error)
      addResult('✅ Custom error with context sent to Sentry')
    } catch (error) {
      addResult('❌ Custom error test failed')
    }
  }

  const testPerformanceTracking = () => {
    addResult('🧪 Testing performance tracking...')
    const startTime = performance.now()
    
    // Simulate risk calculation
    setTimeout(() => {
      const duration = performance.now() - startTime
      trackRiskCalculation('Alto', 'Media', 'Alto', Math.round(duration))
      addResult(`✅ Performance tracking completed (${Math.round(duration)}ms)`)
    }, 100)
  }

  const testUserActionTracking = () => {
    addResult('🧪 Testing user action tracking...')
    trackUserAction('test_button_click', { 
      test_type: 'sentry_integration',
      timestamp: new Date().toISOString()
    })
    addResult('✅ User action tracked')
  }

  const testLocalStorageError = () => {
    addResult('🧪 Testing localStorage error tracking...')
    try {
      // Simulate localStorage error
      const error = new Error('localStorage quota exceeded')
      trackLocalStorageError('write', error, 'test_key')
      addResult('✅ localStorage error tracked')
    } catch (error) {
      addResult('❌ localStorage error test failed')
    }
  }

  const testFormValidationError = () => {
    addResult('🧪 Testing form validation error tracking...')
    trackFormValidationError('risk_impact', '', 'required')
    addResult('✅ Form validation error tracked')
  }

  const testUserContext = () => {
    addResult('🧪 Testing user context setting...')
    setUserContext('test-user-123', 'test@example.com')
    setRiskContext(5, new Date())
    addResult('✅ User context set')
  }

  const testCustomMessage = () => {
    addResult('🧪 Testing custom message capture...')
    Sentry.captureMessage('Test message from Sentry test page', {
      level: 'info',
      tags: {
        test_type: 'custom_message',
        component: 'SentryTestPage'
      },
      extra: {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent
      }
    })
    addResult('✅ Custom message sent to Sentry')
  }

  const testBreadcrumb = () => {
    addResult('🧪 Testing breadcrumb tracking...')
    Sentry.addBreadcrumb({
      category: 'test',
      message: 'Test breadcrumb from Sentry test page',
      level: 'info',
      data: {
        test_type: 'breadcrumb',
        timestamp: new Date().toISOString()
      }
    })
    addResult('✅ Breadcrumb added')
  }

  const runAllTests = () => {
    setTestResults([])
    addResult('🚀 Starting comprehensive Sentry tests...')
    
    setTimeout(() => testBasicError(), 500)
    setTimeout(() => testCustomError(), 1000)
    setTimeout(() => testPerformanceTracking(), 1500)
    setTimeout(() => testUserActionTracking(), 2000)
    setTimeout(() => testLocalStorageError(), 2500)
    setTimeout(() => testFormValidationError(), 3000)
    setTimeout(() => testUserContext(), 3500)
    setTimeout(() => testCustomMessage(), 4000)
    setTimeout(() => testBreadcrumb(), 4500)
    setTimeout(() => {
      addResult('🎉 All tests completed! Check your Sentry dashboard.')
      addResult('📊 Go to: https://sentry.io/organizations/your-org/projects/your-project/')
    }, 5000)
  }

  const clearResults = () => {
    setTestResults([])
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            🧪 Sentry Integration Test Suite
          </h1>
          
          <div className="mb-6">
            <p className="text-gray-600 mb-4">
              This page helps you verify that Sentry is working correctly in your application.
              Each test will send data to your Sentry dashboard.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h3 className="font-semibold text-blue-900 mb-2">📊 How to Verify Results:</h3>
              <ol className="list-decimal list-inside text-blue-800 space-y-1">
                <li>Go to your <a href="https://sentry.io" target="_blank" rel="noopener noreferrer" className="underline">Sentry dashboard</a></li>
                <li>Navigate to your project</li>
                <li>Check the "Issues" tab for errors</li>
                <li>Check the "Performance" tab for performance data</li>
                <li>Check the "Releases" tab for breadcrumbs and custom events</li>
              </ol>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            <button
              onClick={testBasicError}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test Basic Error
            </button>
            
            <button
              onClick={testCustomError}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test Custom Error
            </button>
            
            <button
              onClick={testPerformanceTracking}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test Performance
            </button>
            
            <button
              onClick={testUserActionTracking}
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test User Actions
            </button>
            
            <button
              onClick={testLocalStorageError}
              className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test Storage Error
            </button>
            
            <button
              onClick={testFormValidationError}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test Validation Error
            </button>
            
            <button
              onClick={testUserContext}
              className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test User Context
            </button>
            
            <button
              onClick={testCustomMessage}
              className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test Custom Message
            </button>
            
            <button
              onClick={testBreadcrumb}
              className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Test Breadcrumb
            </button>
          </div>

          <div className="flex gap-4 mb-6">
            <button
              onClick={runAllTests}
              className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all"
            >
              🚀 Run All Tests
            </button>
            
            <button
              onClick={clearResults}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
            >
              Clear Results
            </button>
          </div>

          <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm max-h-96 overflow-y-auto">
            <h3 className="text-white font-semibold mb-2">Test Results:</h3>
            {testResults.length === 0 ? (
              <p className="text-gray-400">No tests run yet. Click a test button above to start.</p>
            ) : (
              testResults.map((result, index) => (
                <div key={index} className="mb-1">
                  {result}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
