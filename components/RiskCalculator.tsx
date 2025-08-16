'use client'

import { useState, useEffect } from 'react'
import { Plus, Save, AlertTriangle, Shield, FileText } from 'lucide-react'
import { Risk, ImpactLevel, ProbabilityLevel, RiskLevel, RiskMatrix } from '@/types/risk'
import RiskMatrixComponent from './RiskMatrix'

import RiskList from './RiskList'

const RiskCalculator = () => {
  const [risks, setRisks] = useState<Risk[]>([])
  const [showForm, setShowForm] = useState(false)

  // Matriz de riesgo predefinida
  const riskMatrix: RiskMatrix = {
    'Muy Baja': {
      'Muy Bajo': 'Bajo',
      'Bajo': 'Bajo',
      'Medio': 'Bajo',
      'Alto': 'Medio',
      'Muy Alto': 'Medio'
    },
    'Baja': {
      'Muy Bajo': 'Bajo',
      'Bajo': 'Bajo',
      'Medio': 'Medio',
      'Alto': 'Medio',
      'Muy Alto': 'Alto'
    },
    'Media': {
      'Muy Bajo': 'Bajo',
      'Bajo': 'Medio',
      'Medio': 'Medio',
      'Alto': 'Alto',
      'Muy Alto': 'Alto'
    },
    'Alta': {
      'Muy Bajo': 'Medio',
      'Bajo': 'Medio',
      'Medio': 'Alto',
      'Alto': 'Alto',
      'Muy Alto': 'Crítico'
    },
    'Muy Alta': {
      'Muy Bajo': 'Medio',
      'Bajo': 'Alto',
      'Medio': 'Alto',
      'Alto': 'Crítico',
      'Muy Alto': 'Crítico'
    }
  }

  const calculateRiskLevel = (impact: ImpactLevel, probability: ProbabilityLevel): RiskLevel => {
    return riskMatrix[probability]?.[impact] || 'Medio'
  }

  const addRisk = (riskData: Omit<Risk, 'id' | 'riskLevel' | 'createdAt' | 'updatedAt'>) => {
    const newRisk: Risk = {
      ...riskData,
      id: Date.now().toString(),
      riskLevel: calculateRiskLevel(riskData.impact, riskData.probability),
      createdAt: new Date(),
      updatedAt: new Date()
    }
    
    setRisks(prev => [newRisk, ...prev])
    setShowForm(false)
  }

  const deleteRisk = (id: string) => {
    setRisks(prev => prev.filter(risk => risk.id !== id))
  }

  const updateRisk = (id: string, updatedData: Partial<Risk>) => {
    setRisks(prev => prev.map(risk => 
      risk.id === id 
        ? { ...risk, ...updatedData, updatedAt: new Date() }
        : risk
    ))
  }

  // Cargar riesgos desde localStorage al inicializar
  useEffect(() => {
    const savedRisks = localStorage.getItem('risks')
    if (savedRisks) {
      try {
        const parsedRisks = JSON.parse(savedRisks)
        // Convertir las fechas de string a Date
        const risksWithDates = parsedRisks.map((risk: any) => ({
          ...risk,
          createdAt: new Date(risk.createdAt),
          updatedAt: new Date(risk.updatedAt)
        }))
        setRisks(risksWithDates)
      } catch (error) {
        console.error('Error loading risks from localStorage:', error)
      }
    }
  }, [])

  // Guardar riesgos en localStorage cuando cambien
  useEffect(() => {
    localStorage.setItem('risks', JSON.stringify(risks))
  }, [risks])

  return (
    <div className="space-y-8">
      {/* Botón para agregar nuevo riesgo */}
      <div className="flex justify-center">
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <Plus className="w-5 h-5" />
          Agregar Nuevo Riesgo
        </button>
      </div>

      {/* Formulario de riesgo */}
    

      {/* Matriz de riesgo */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-orange-500" />
          Matriz de Riesgo
        </h2>
        <RiskMatrixComponent matrix={riskMatrix} />
      </div>

      {/* Lista de riesgos registrados */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
          <FileText className="w-6 h-6 text-blue-500" />
          Riesgos Registrados ({risks.length})
        </h2>
        {risks.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Shield className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <p className="text-lg">No hay riesgos registrados</p>
            <p className="text-sm">Haz clic en "Agregar Nuevo Riesgo" para comenzar</p>
          </div>
        ) : (
          <RiskList 
            risks={risks}
            onDelete={deleteRisk}
            onUpdate={updateRisk}
          />
        )}
      </div>
    </div>
  )
}

export default RiskCalculator
