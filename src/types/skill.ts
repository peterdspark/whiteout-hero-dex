export type SkillCategory = '탐험' | '원정'

export interface Skill {
  id: string
  heroId: string
  name: string
  category: SkillCategory
  description: string
  statName: string
  unit: string
  levels: number[]
  sourceUrl: string
  verificationStatus: string
  verificationBadgeText: string
  evidence?: string
}
