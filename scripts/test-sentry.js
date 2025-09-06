// Enhanced Sentry Integration Test Script
// Run this in the browser console to test error tracking
// Or visit /sentry-test page for a better UI experience

console.log('🧪 Enhanced Sentry Integration Test Suite')
console.log('📊 Visit /sentry-test for a better testing experience')

// Check if Sentry is available
if (typeof window !== 'undefined' && window.Sentry) {
  console.log('✅ Sentry is loaded and available')
} else {
  console.log('❌ Sentry is not available. Make sure the app is running and Sentry is properly configured.')
}

// Test 1: Basic error capture
function testBasicError() {
  try {
    throw new Error('Test error for Sentry integration - Console Test')
  } catch (error) {
    console.log('✅ Basic error test passed')
    if (window.Sentry) {
      window.Sentry.captureException(error)
      console.log('📤 Error sent to Sentry')
    }
  }
}

// Test 2: Custom error with context
function testCustomError() {
  try {
    const error = new Error('Custom risk calculation error - Console Test')
    error.name = 'RiskCalculationError'
    error.riskData = { impact: 'Alto', probability: 'Media' }
    throw error
  } catch (error) {
    console.log('✅ Custom error test passed')
    if (window.Sentry) {
      window.Sentry.captureException(error, {
        tags: {
          test_type: 'console_test',
          component: 'RiskCalculator'
        },
        extra: {
          riskData: error.riskData,
          timestamp: new Date().toISOString()
        }
      })
      console.log('📤 Custom error sent to Sentry')
    }
  }
}

// Test 3: Performance tracking
function testPerformanceTracking() {
  const startTime = performance.now()
  
  // Simulate risk calculation
  setTimeout(() => {
    const duration = performance.now() - startTime
    console.log(`✅ Performance test completed in ${duration.toFixed(2)}ms`)
    
    if (window.Sentry) {
      window.Sentry.addBreadcrumb({
        category: 'performance',
        message: 'Console performance test completed',
        level: 'info',
        data: { 
          duration: duration.toFixed(2),
          test_type: 'console_test'
        }
      })
      
      window.Sentry.captureMessage('Performance test completed', {
        level: 'info',
        tags: {
          test_type: 'performance',
          source: 'console'
        },
        extra: {
          duration: duration.toFixed(2)
        }
      })
      console.log('📤 Performance data sent to Sentry')
    }
  }, 100)
}

// Test 4: User action tracking
function testUserActionTracking() {
  console.log('✅ User action test passed')
  
  if (window.Sentry) {
    window.Sentry.addBreadcrumb({
      category: 'user_action',
      message: 'User performed console test action',
      level: 'info',
      data: { 
        action: 'console_test_action', 
        timestamp: new Date().toISOString(),
        source: 'console'
      }
    })
    console.log('📤 User action tracked in Sentry')
  }
}

// Test 5: Custom message
function testCustomMessage() {
  if (window.Sentry) {
    window.Sentry.captureMessage('Test message from console', {
      level: 'info',
      tags: {
        test_type: 'console_message',
        source: 'browser_console'
      },
      extra: {
        timestamp: new Date().toISOString(),
        user_agent: navigator.userAgent,
        url: window.location.href
      }
    })
    console.log('📤 Custom message sent to Sentry')
  }
}

// Test 6: Set user context
function testUserContext() {
  if (window.Sentry) {
    window.Sentry.setUser({
      id: 'console-test-user',
      email: 'test@console.com',
      username: 'console_tester'
    })
    
    window.Sentry.setContext('test_context', {
      test_type: 'console_integration',
      timestamp: new Date().toISOString(),
      environment: 'development'
    })
    console.log('📤 User context set in Sentry')
  }
}

// Run all tests with better timing
function runAllTests() {
  console.log('🚀 Running comprehensive Sentry tests...')
  
  setTimeout(() => {
    console.log('1️⃣ Testing basic error capture...')
    testBasicError()
  }, 1000)
  
  setTimeout(() => {
    console.log('2️⃣ Testing custom error with context...')
    testCustomError()
  }, 2000)
  
  setTimeout(() => {
    console.log('3️⃣ Testing performance tracking...')
    testPerformanceTracking()
  }, 3000)
  
  setTimeout(() => {
    console.log('4️⃣ Testing user action tracking...')
    testUserActionTracking()
  }, 4000)
  
  setTimeout(() => {
    console.log('5️⃣ Testing custom message...')
    testCustomMessage()
  }, 5000)
  
  setTimeout(() => {
    console.log('6️⃣ Testing user context...')
    testUserContext()
  }, 6000)
  
  setTimeout(() => {
    console.log('🎉 All Sentry tests completed!')
    console.log('📊 Check your Sentry dashboard for results:')
    console.log('   - Issues tab: for errors')
    console.log('   - Performance tab: for performance data')
    console.log('   - Releases tab: for breadcrumbs and custom events')
    console.log('💡 Tip: Visit /sentry-test for a better testing UI')
  }, 7000)
}

// Export for manual testing
window.testSentry = {
  testBasicError,
  testCustomError,
  testPerformanceTracking,
  testUserActionTracking,
  testCustomMessage,
  testUserContext,
  runAllTests
}

// Auto-run if in console
if (typeof window !== 'undefined') {
  console.log('🔧 Available commands:')
  console.log('   testSentry.runAllTests() - Run all tests')
  console.log('   testSentry.testBasicError() - Test basic error')
  console.log('   testSentry.testCustomError() - Test custom error')
  console.log('   testSentry.testPerformanceTracking() - Test performance')
  console.log('   testSentry.testUserActionTracking() - Test user actions')
  console.log('   testSentry.testCustomMessage() - Test custom message')
  console.log('   testSentry.testUserContext() - Test user context')
}
