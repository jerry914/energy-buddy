import type { Translations } from '../i18n/locales'

export type DayPlan = 'fullCapacity' | 'moderate' | 'restDay'

export function suggestedPlan(capacity: number): DayPlan {
  if (capacity >= 8) return 'fullCapacity'
  if (capacity >= 5) return 'moderate'
  return 'restDay'
}

export function suggestionText(plan: DayPlan, t: Translations): string {
  switch (plan) {
    case 'fullCapacity': return t.planFull
    case 'moderate': return t.planModerate
    case 'restDay': return t.planRest
  }
}

export function energyEmoji(capacity: number): string {
  if (capacity >= 8) return '☀️'
  if (capacity >= 5) return '⛅'
  return '🌙'
}

export function generateReminders(
  capacity: number,
  highTaskCount: number,
  actualUsed: number,
  t: Translations,
): string[] {
  const reminders: string[] = []

  if (highTaskCount >= 2) {
    reminders.push(t.reminderHighMultiple)
  } else if (highTaskCount === 1) {
    reminders.push(t.reminderHighOne)
  }

  if (capacity < 5) {
    reminders.push(t.reminderLowCapacity)
  }

  if (actualUsed > capacity * 0.8 && actualUsed <= capacity) {
    reminders.push(t.reminderNearLimit)
  }

  if (actualUsed > capacity) {
    reminders.push(t.reminderOverloaded)
  }

  if (reminders.length === 0) {
    reminders.push(t.reminderDefault)
  }

  return reminders
}
