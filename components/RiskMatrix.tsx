'use client'

import { RiskMatrix as RiskMatrixType } from '@/types/risk'

interface RiskMatrixProps {
  matrix: RiskMatrixType
}

const RiskMatrix = ({ matrix }: RiskMatrixProps) => {
  const impactLevels = ['Muy Bajo', 'Bajo', 'Medio', 'Alto', 'Muy Alto']
  const probabilityLevels = ['Muy Baja', 'Baja', 'Media', 'Alta', 'Muy Alta']

  const getRiskLevelColor = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo': return 'bg-risk-low'
      case 'Medio': return 'bg-risk-medium'
      case 'Alto': return 'bg-risk-high'
      case 'Crítico': return 'bg-risk-critical'
      default: return 'bg-gray-300'
    }
  }

  const getRiskLevelDescription = (riskLevel: string) => {
    switch (riskLevel) {
      case 'Bajo': return 'Riesgo aceptable, monitoreo mínimo requerido'
      case 'Medio': 'Riesgo moderado, requiere atención y seguimiento'
      case 'Alto': 'Riesgo significativo, requiere acción inmediata'
      case 'Crítico': 'Riesgo extremo, requiere acción urgente y recursos'
      default: return 'Nivel de riesgo no definido'
    }
  }

  return (
    <div className="space-y-6">
      {/* Descripción de la matriz */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">¿Cómo funciona la matriz de riesgo?</h4>
        <p className="text-sm text-blue-800">
          La matriz combina el nivel de impacto (eje X) con el nivel de probabilidad (eje Y) 
          para determinar el nivel de riesgo general. Los colores indican la prioridad de acción:
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-3">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-risk-low rounded"></div>
            <span className="text-xs text-blue-800">Bajo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-risk-medium rounded"></div>
            <span className="text-xs text-blue-800">Medio</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-risk-high rounded"></div>
            <span className="text-xs text-blue-800">Alto</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-risk-critical rounded"></div>
            <span className="text-xs text-blue-800">Crítico</span>
          </div>
        </div>
      </div>

      {/* Matriz de riesgo */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 p-3 text-sm font-medium text-gray-700">
                Probabilidad / Impacto
              </th>
              {impactLevels.map((impact) => (
                <th key={impact} className="border border-gray-300 p-3 text-sm font-medium text-gray-700">
                  {impact}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {probabilityLevels.map((probability) => (
              <tr key={probability}>
                <td className="border border-gray-300 p-3 text-sm font-medium text-gray-700 bg-gray-50">
                  {probability}
                </td>
                {impactLevels.map((impact) => {
                  const riskLevel = matrix[probability]?.[impact]
                  return (
                    <td 
                      key={`${probability}-${impact}`} 
                      className={`border border-gray-300 p-3 text-center text-sm font-medium text-white ${getRiskLevelColor(riskLevel || '')}`}
                    >
                      {riskLevel || '-'}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Leyenda detallada */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Niveles de Impacto</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Muy Bajo:</strong> Impacto mínimo en operaciones</li>
            <li><strong>Bajo:</strong> Impacto menor en procesos</li>
            <li><strong>Medio:</strong> Impacto moderado en resultados</li>
            <li><strong>Alto:</strong> Impacto significativo en objetivos</li>
            <li><strong>Muy Alto:</strong> Impacto crítico en la organización</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-900 mb-3">Niveles de Probabilidad</h4>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><strong>Muy Baja:</strong> Ocurre raramente (≤5%)</li>
            <li><strong>Baja:</strong> Ocurre ocasionalmente (6-20%)</li>
            <li><strong>Media:</strong> Ocurre a veces (21-50%)</li>
            <li><strong>Alta:</strong> Ocurre frecuentemente (51-80%)</li>
            <li><strong>Muy Alta:</strong> Ocurre casi siempre (≥81%)</li>
          </ul>
        </div>
      </div>

      {/* Recomendaciones por nivel de riesgo */}
      <div className="bg-yellow-50 p-4 rounded-lg">
        <h4 className="font-medium text-yellow-900 mb-3">Recomendaciones por Nivel de Riesgo</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h5 className="font-medium text-yellow-800 mb-2">Riesgos Bajos y Medios</h5>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Monitoreo regular</li>
              <li>• Documentación de controles</li>
              <li>• Revisión periódica</li>
            </ul>
          </div>
          <div>
            <h5 className="font-medium text-yellow-800 mb-2">Riesgos Altos y Críticos</h5>
            <ul className="text-sm text-yellow-800 space-y-1">
              <li>• Acción inmediata requerida</li>
              <li>• Asignación de recursos</li>
              <li>• Seguimiento continuo</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RiskMatrix
