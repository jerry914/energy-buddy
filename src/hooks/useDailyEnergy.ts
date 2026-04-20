import { useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, todayStr, getSettings } from '../db/database'
import { DEFAULT_SETTINGS, type AppSettings } from '../models/types'
import { calcPredictedEnergy } from '../logic/energyCalculator'

const NOT_FOUND = Symbol()

export function useDailyEnergy() {
  const today = todayStr()

  const result = useLiveQuery(
    async () => {
      const record = await db.dailyEnergy.where('date').equals(today).first()
      return record ?? NOT_FOUND
    },
    [today]
  )

  const settings = useLiveQuery(
    () => db.settings.get(1),
    []
  )

  const isLoading = result === undefined
  const energy = result === NOT_FOUND || result === undefined ? null : result
  const needsCheckIn = !isLoading && result === NOT_FOUND

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
    energy,
    needsCheckIn,
    settings: settings ?? DEFAULT_SETTINGS,
    checkIn,
  }
}
