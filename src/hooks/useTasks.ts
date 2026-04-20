import { useCallback } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { db, todayStr, getSettings } from '../db/database'
import type { EBTask, Intensity, TaskCategory } from '../models/types'
import { calcEnergyScore, calcActualEnergyUsed } from '../logic/energyCalculator'

export function useTasks(date?: string) {
  const targetDate = date ?? todayStr()

  const tasks = useLiveQuery(
    () => db.tasks.where('date').equals(targetDate).toArray(),
    [targetDate],
    []
  )

  const addTask = useCallback(async (
    name: string,
    duration: number,
    intensity: Intensity,
    category: TaskCategory,
  ) => {
    const settings = await getSettings()
    const energyScore = calcEnergyScore(duration, intensity, settings)
    await db.tasks.add({
      date: targetDate,
      name,
      duration,
      intensity,
      category,
      energyScore,
      isCompleted: false,
    })
    await syncDailyEnergy(targetDate)
  }, [targetDate])

  const toggleComplete = useCallback(async (id: number) => {
    const task = await db.tasks.get(id)
    if (!task) return
    await db.tasks.update(id, { isCompleted: !task.isCompleted })
    await syncDailyEnergy(targetDate)
  }, [targetDate])

  const updateTask = useCallback(async (
    id: number,
    patch: Partial<Pick<EBTask, 'name' | 'duration' | 'intensity' | 'category'>>,
  ) => {
    const task = await db.tasks.get(id)
    if (!task) return
    const settings = await getSettings()
    const newDuration = patch.duration ?? task.duration
    const newIntensity = patch.intensity ?? task.intensity
    const energyScore = calcEnergyScore(newDuration, newIntensity, settings)
    await db.tasks.update(id, { ...patch, energyScore })
    await syncDailyEnergy(targetDate)
  }, [targetDate])

  const deleteTask = useCallback(async (id: number) => {
    await db.tasks.delete(id)
    await syncDailyEnergy(targetDate)
  }, [targetDate])

  return { tasks, addTask, toggleComplete, updateTask, deleteTask }
}

async function syncDailyEnergy(date: string) {
  const allTasks = await db.tasks.where('date').equals(date).toArray()
  const actual = calcActualEnergyUsed(allTasks)
  const existing = await db.dailyEnergy.where('date').equals(date).first()
  if (existing?.id) {
    const capacity = existing.predictedEnergy / 10
    await db.dailyEnergy.update(existing.id, {
      actualEnergyUsed: actual,
      overloadFlag: actual > capacity,
    })
  }
}
