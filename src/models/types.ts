export type Intensity = 'high' | 'medium' | 'low'
export type TaskCategory = 'deepWork' | 'meeting' | 'admin' | 'learning'

export interface EBTask {
  id?: number
  date: string // YYYY-MM-DD
  name: string
  duration: number
  intensity: Intensity
  category: TaskCategory
  energyScore: number
  isCompleted: boolean
}

export interface DailyEnergy {
  id?: number
  date: string // YYYY-MM-DD, unique
  sleepHours: number
  morningEnergy: number // 1-10
  predictedEnergy: number
  actualEnergyUsed: number
  overloadFlag: boolean
}

export interface AppSettings {
  id: number // always 1
  highWeight: number
  mediumWeight: number
  lowWeight: number
  dailyEnergyBudget: number
  sleepWeight: number
  morningWeight: number
}

export const DEFAULT_SETTINGS: AppSettings = {
  id: 1,
  highWeight: 1.5,
  mediumWeight: 1.0,
  lowWeight: 0.5,
  dailyEnergyBudget: 10,
  sleepWeight: 0.4,
  morningWeight: 0.6,
}

export const INTENSITY_LABELS: Record<Intensity, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  deepWork: '深度工作',
  meeting: '會議',
  admin: '行政',
  learning: '學習',
}
