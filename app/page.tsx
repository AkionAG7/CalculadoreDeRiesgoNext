'use client'


import RiskCalculator from '@/components/RiskCalculator'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Calculadora de Riesgos
        </h1>
        <p className="text-xl text-gray-600">
          Sistema integral para la gestión y evaluación de riesgos empresariales
        </p>
      </div>
      
      <RiskCalculator />
    </main>
  )
}
