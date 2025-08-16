'use client'

import { useState } from 'react'
import { 
  ChevronDown, 
  ChevronUp, 
  Trash2, 
  Edit, 
  Calendar, 
  AlertTriangle,
  Shield,
  FileText,
  Clock
} from 'lucide-react'
import { Risk } from '@/types/risk'

interface RiskListProps {
  risks: Risk[]
  onDelete: (id: string) => void
  onUpdate: (id: string, data: Partial<Risk>) => void
}

const RiskList = ({ risks, onDelete, onUpdate }: RiskListProps) => {
  const [expandedRisks, setExpandedRisks] = useState<Set<string>>(new Set())
  const [editingRisk, setEditingRisk] = useState<string | null>(null)
  const [editData, setEditData] = useState<Partial<Risk>>({})

  const toggleExpanded = (riskId: string) => {
    const newExpanded = new Set(expandedRisks)
    if (newExpanded.has(riskId)) {
      newExpanded.delete(riskId)
    } else {
      newExpanded.add(riskId)
    }
    setExpandedRisks(newExpanded)
  }

  const startEditing = (risk: Risk) => {
    setEditingRisk(risk.id)
    setEditData({
      description: risk.description,
      contingencyPlan: risk.contingencyPlan,
      mitigationPlan: risk.mitigationPlan
    })
  }

  const saveEdit = (riskId: string) => {
    onUpdate(riskId, editData)
    setEditingRisk(null)
    setEditData({})
  }

  const cancelEdit = () => {
    setEditingRisk(null)
    setEditData({})
  }

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo': return 'bg-risk-low'
      case 'Medio': return 'bg-risk-medium'
      case 'Alto': return 'bg-risk-high'
      case 'Crítico': return 'bg-risk-critical'
      default: return 'bg-gray-300'
    }
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  const getRiskPriority = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo': return 'Baja prioridad'
      case 'Medio': return 'Prioridad moderada'
      case 'Alto': return 'Alta prioridad'
      case 'Crítico': return 'Prioridad crítica'
      default: return 'Prioridad no definida'
    }
  }

  return (
    <div className="space-y-4">
      {risks.map((risk) => (
        <div key={risk.id} className="bg-white border border-gray-200 rounded-lg shadow-sm">
          {/* Header del riesgo */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${getRiskLevelColor(risk.riskLevel)}`}></div>
                <div>
                  <h4 className="font-medium text-gray-900 line-clamp-2">
                    {risk.description.length > 80 
                      ? `${risk.description.substring(0, 80)}...` 
                      : risk.description
                    }
                  </h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      Impacto: {risk.impact}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Probabilidad: {risk.probability}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium text-white ${getRiskLevelColor(risk.riskLevel)}`}>
                      {risk.riskLevel}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toggleExpanded(risk.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {expandedRisks.has(risk.id) ? (
                    <ChevronUp className="w-5 h-5" />
                  ) : (
                    <ChevronDown className="w-5 h-5" />
                  )}
                </button>
                
                <button
                  onClick={() => startEditing(risk)}
                  className="p-2 text-blue-400 hover:text-blue-600 transition-colors"
                  title="Editar riesgo"
                >
                  <Edit className="w-4 h-4" />
                </button>
                
                <button
                  onClick={() => onDelete(risk.id)}
                  className="p-2 text-red-400 hover:text-red-600 transition-colors"
                  title="Eliminar riesgo"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Contenido expandible */}
          {expandedRisks.has(risk.id) && (
            <div className="p-4 bg-gray-50">
              {editingRisk === risk.id ? (
                /* Modo de edición */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Descripción del Riesgo
                    </label>
                    <textarea
                      value={editData.description || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan de Contingencia
                    </label>
                    <textarea
                      value={editData.contingencyPlan || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, contingencyPlan: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Plan de Mitigación
                    </label>
                    <textarea
                      value={editData.mitigationPlan || ''}
                      onChange={(e) => setEditData(prev => ({ ...prev, mitigationPlan: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      onClick={cancelEdit}
                      className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={() => saveEdit(risk.id)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                      Guardar Cambios
                    </button>
                  </div>
                </div>
              ) : (
                /* Modo de visualización */
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      Descripción Completa
                    </h5>
                    <p className="text-gray-700 bg-white p-3 rounded border">
                      {risk.description}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-orange-500" />
                        Plan de Contingencia
                      </h5>
                      <p className="text-gray-700 bg-white p-3 rounded border text-sm">
                        {risk.contingencyPlan}
                      </p>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2 flex items-center gap-2">
                        <Shield className="w-4 h-4 text-green-500" />
                        Plan de Mitigación
                      </h5>
                      <p className="text-gray-700 bg-white p-3 rounded border text-sm">
                        {risk.mitigationPlan}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500">Prioridad</div>
                      <div className="text-lg font-semibold text-gray-900">
                        {getRiskPriority(risk.riskLevel)}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500">Creado</div>
                      <div className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {formatDate(risk.createdAt)}
                      </div>
                    </div>
                    
                    <div className="text-center">
                      <div className="text-sm font-medium text-gray-500">Última Actualización</div>
                      <div className="text-sm text-gray-700 flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        {formatDate(risk.updatedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default RiskList
