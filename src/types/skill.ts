export type SkillCategory = '탐험' | '원정'

export interface SkillEffect {
  statName: string
  unit: string
  levels: number[]
}

export interface Skill {
  id: string
  heroId: string
  name: string
  category: SkillCategory
  description: string
  effects: SkillEffect[]
  sourceUrl: string
  verificationStatus: string
  verificationBadgeText: string
  evidence?: string
  verificationDate?: string
  notes?: string
}
