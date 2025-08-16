export interface Risk {
  id: string
  description: string
  impact: ImpactLevel
  probability: ProbabilityLevel
  riskLevel: RiskLevel
  contingencyPlan: string
  mitigationPlan: string
  createdAt: Date
  updatedAt: Date
}

export type ImpactLevel = 
  | 'Muy Bajo'
  | 'Bajo'
  | 'Medio'
  | 'Alto'
  | 'Muy Alto'

export type ProbabilityLevel = 
  | 'Muy Baja'
  | 'Baja'
  | 'Media'
  | 'Alta'
  | 'Muy Alta'

export type RiskLevel = 
  | 'Bajo'
  | 'Medio'
  | 'Alto'
  | 'Crítico'

export interface RiskMatrix {
  [key: string]: {
    [key: string]: RiskLevel
  }
}
