'use client'

import { useState } from 'react'
import { Save, X, AlertCircle, CheckCircle } from 'lucide-react'
import { ImpactLevel, ProbabilityLevel, RiskMatrix } from '@/types/risk'
import '../app/globals.css'
interface RiskFormProps {
  onSubmit: (data: {
    description: string
    impact: ImpactLevel
    probability: ProbabilityLevel
    contingencyPlan: string
    mitigationPlan: string
  }) => void
  onCancel: () => void
  riskMatrix: RiskMatrix
}

const RiskForm = ({ onSubmit, onCancel, riskMatrix }: RiskFormProps) => {
  const [formData, setFormData] = useState({
    description: '',
    impact: 'Medio' as ImpactLevel,
    probability: 'Media' as ProbabilityLevel,
    contingencyPlan: '',
    mitigationPlan: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const impactLevels: ImpactLevel[] = ['Muy Bajo', 'Bajo', 'Medio', 'Alto', 'Muy Alto']
  const probabilityLevels: ProbabilityLevel[] = ['Muy Baja', 'Baja', 'Media', 'Alta', 'Muy Alta']

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.description.trim()) {
      newErrors.description = 'La descripción del riesgo es obligatoria'
    } else if (formData.description.trim().length < 10) {
      newErrors.description = 'La descripción debe tener al menos 10 caracteres'
    }

    if (!formData.contingencyPlan.trim()) {
      newErrors.contingencyPlan = 'El plan de contingencia es obligatorio'
    } else if (formData.contingencyPlan.trim().length < 20) {
      newErrors.contingencyPlan = 'El plan de contingencia debe tener al menos 20 caracteres'
    }

    if (!formData.mitigationPlan.trim()) {
      newErrors.mitigationPlan = 'El plan de mitigación es obligatorio'
    } else if (formData.mitigationPlan.trim().length < 20) {
      newErrors.mitigationPlan = 'El plan de mitigación debe tener al menos 20 caracteres'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const getRiskLevelColor = (impact: ImpactLevel, probability: ProbabilityLevel) => {
    const riskLevel = riskMatrix[probability]?.[impact]
    switch (riskLevel) {
      case 'Bajo': return 'bg-risk-low'
      case 'Medio': return 'bg-risk-medium'
      case 'Alto': return 'bg-risk-high'
      case 'Crítico': return 'bg-risk-critical'
      default: return 'bg-gray-300'
    }
  }

  const getRiskLevelText = (impact: ImpactLevel, probability: ProbabilityLevel) => {
    return riskMatrix[probability]?.[impact] || 'Medio'
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Nuevo Riesgo</h3>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Descripción del riesgo */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Descripción del Riesgo *
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={4}
            placeholder="Describe detalladamente el riesgo identificado..."
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.description}
            </p>
          )}
        </div>

        {/* Nivel de Impacto y Probabilidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="impact" className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Impacto *
            </label>
            <select
              id="impact"
              value={formData.impact}
              onChange={(e) => setFormData(prev => ({ ...prev, impact: e.target.value as ImpactLevel }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {impactLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="probability" className="block text-sm font-medium text-gray-700 mb-2">
              Nivel de Probabilidad *
            </label>
            <select
              id="probability"
              value={formData.probability}
              onChange={(e) => setFormData(prev => ({ ...prev, probability: e.target.value as ProbabilityLevel }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {probabilityLevels.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Nivel de Riesgo Calculado */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Nivel de Riesgo Calculado:</span>
            <span className={`px-3 py-1 rounded-full text-white font-medium text-sm ${getRiskLevelColor(formData.impact, formData.probability)}`}>
              {getRiskLevelText(formData.impact, formData.probability)}
            </span>
          </div>
        </div>

        {/* Plan de Contingencia */}
        <div>
          <label htmlFor="contingencyPlan" className="block text-sm font-medium text-gray-700 mb-2">
            Plan de Contingencia *
          </label>
          <textarea
            id="contingencyPlan"
            value={formData.contingencyPlan}
            onChange={(e) => setFormData(prev => ({ ...prev, contingencyPlan: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.contingencyPlan ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Describe el plan de contingencia para este riesgo..."
          />
          {errors.contingencyPlan && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.contingencyPlan}
            </p>
          )}
        </div>

        {/* Plan de Mitigación */}
        <div>
          <label htmlFor="mitigationPlan" className="block text-sm font-medium text-gray-700 mb-2">
            Plan de Mitigación *
          </label>
          <textarea
            id="mitigationPlan"
            value={formData.mitigationPlan}
            onChange={(e) => setFormData(prev => ({ ...prev, mitigationPlan: e.target.value }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.mitigationPlan ? 'border-red-500' : 'border-gray-300'
            }`}
            rows={3}
            placeholder="Describe el plan de mitigación para reducir este riesgo..."
          />
          {errors.mitigationPlan && (
            <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.mitigationPlan}
            </p>
          )}
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Guardar Riesgo
          </button>
        </div>
      </form>
    </div>
  )
}

export default RiskForm
