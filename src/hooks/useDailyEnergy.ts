import { useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, todayStr, getSettings } from '../db/database'
import type { AppSettings } from '../models/types'
import { calcPredictedEnergy } from '../logic/energyCalculator'

export function useDailyEnergy() {
  const today = todayStr()

  const energy = useLiveQuery(
    () => db.dailyEnergy.where('date').equals(today).first(),
    [today]
  )

  const settings = useLiveQuery(
    () => getSettings(),
    []
  )

  const checkIn = useCallback(async (sleepHours: number, morningEnergy: number) => {
    const s: AppSettings = settings ?? await getSettings()
    const predicted = calcPredictedEnergy(sleepHours, morningEnergy, s)
    await db.dailyEnergy.put({
      date: today,
      sleepHours,
      morningEnergy,
      predictedEnergy: predicted,
      actualEnergyUsed: 0,
      overloadFlag: false,
    })
  }, [settings, today])

  return {
    energy: energy ?? null,
    needsCheckIn: energy !== undefined && !energy,
    settings: settings ?? null,
    checkIn,
  }
}
