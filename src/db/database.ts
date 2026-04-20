import Dexie, { type Table } from 'dexie'
import type { EBTask, DailyEnergy, AppSettings } from '../models/types'
import { DEFAULT_SETTINGS } from '../models/types'

class EnergyBuddyDB extends Dexie {
  tasks!: Table<EBTask, number>
  dailyEnergy!: Table<DailyEnergy, number>
  settings!: Table<AppSettings, number>

  constructor() {
    super('EnergyBuddyDB')
    this.version(1).stores({
      tasks: '++id, date',
      dailyEnergy: '++id, &date',
      settings: 'id',
    })
  }
}

export const db = new EnergyBuddyDB()

export async function ensureDefaults(): Promise<void> {
  const existing = await db.settings.get(1)
  if (!existing) {
    await db.settings.put(DEFAULT_SETTINGS)
  }
}

ensureDefaults()

export async function getSettings(): Promise<AppSettings> {
  return (await db.settings.get(1)) ?? DEFAULT_SETTINGS
}

export function todayStr(): string {
  return new Date().toISOString().slice(0, 10)
}
