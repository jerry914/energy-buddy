export type DayPlan = 'fullCapacity' | 'moderate' | 'restDay'

export function suggestedPlan(capacity: number): DayPlan {
  if (capacity >= 8) return 'fullCapacity'
  if (capacity >= 5) return 'moderate'
  return 'restDay'
}

export function suggestionText(plan: DayPlan): string {
  switch (plan) {
    case 'fullCapacity':
      return '適合 1 件高強度 + 2 件中強度'
    case 'moderate':
      return '適合 1 件高強度 + 1 件中強度 + 1 件低強度'
    case 'restDay':
      return '今天適合慢慢來，以低強度任務為主'
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
): string[] {
  const reminders: string[] = []

  if (highTaskCount >= 2) {
    reminders.push('你今天已經排了多個高強度任務，下午建議不要再加新的 deep work。')
  } else if (highTaskCount === 1) {
    reminders.push('你今天已經排了 1 個高強度任務，下午建議不要再加新的 deep work。')
  }

  if (capacity < 5) {
    reminders.push('今天精力偏低，安排一件最重要的事就很好。')
  }

  if (actualUsed > capacity * 0.8 && actualUsed <= capacity) {
    reminders.push('精力快到上限了，剩下的時間做輕鬆的事吧。')
  }

  if (actualUsed > capacity) {
    reminders.push('今天已經超載了，好好休息，明天再來。')
  }

  if (reminders.length === 0) {
    reminders.push('如果下午累了，改做輕量任務也算有照顧進度。')
  }

  return reminders
}
