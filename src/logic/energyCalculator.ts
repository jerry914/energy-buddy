import type { AppSettings, Intensity, EBTask } from '../models/types'

export function intensityWeight(intensity: Intensity, settings: AppSettings): number {
  switch (intensity) {
    case 'high': return settings.highWeight
    case 'medium': return settings.mediumWeight
    case 'low': return settings.lowWeight
  }
}

export function calcEnergyScore(duration: number, intensity: Intensity, settings: AppSettings): number {
  return duration * intensityWeight(intensity, settings)
}

export function calcPredictedEnergy(sleepHours: number, morningEnergy: number, settings: AppSettings): number {
  const sleepComponent = (sleepHours / 8 * 100) * settings.sleepWeight
  const morningComponent = (morningEnergy / 10 * 100) * settings.morningWeight
  return sleepComponent + morningComponent
}

export function calcEnergyCapacity(sleepHours: number, morningEnergy: number, settings: AppSettings): number {
  return calcPredictedEnergy(sleepHours, morningEnergy, settings) / 10
}

export function calcActualEnergyUsed(tasks: EBTask[]): number {
  return tasks
    .filter(t => t.isCompleted)
    .reduce((sum, t) => sum + t.energyScore, 0)
}

export function isOverloaded(actualUsed: number, capacity: number): boolean {
  return actualUsed > capacity
}
