import { useLiveQuery } from 'dexie-react-hooks'
import { SoftCard } from '../components/SoftCard'
import { InsightMessageCard } from '../components/InsightMessageCard'
import { useI18n } from '../i18n/context'
import { db } from '../db/database'
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
} from 'recharts'

function getWeekDates(): string[] {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
}

export function InsightsPage() {
  const { t } = useI18n()
  const weekDates = getWeekDates()

  const stats = useLiveQuery(async () => {
    const records = await db.dailyEnergy.where('date').anyOf(weekDates).toArray()
    const map = new Map(records.map(r => [r.date, r]))

    const data = weekDates.map(dateStr => {
      const d = new Date(dateStr + 'T00:00:00')
      const record = map.get(dateStr)
      return {
        day: t.dayNames[d.getDay()],
        score: record ? Math.round(record.predictedEnergy) : 0,
        overload: record?.overloadFlag ?? false,
      }
    })

    let totalCapacity = 0
    let overloadDays = 0
    let bestScore = 0
    let bestDay = ''
    for (const record of records) {
      totalCapacity += record.predictedEnergy / 10
      if (record.overloadFlag) overloadDays++
      const score = Math.round(record.predictedEnergy)
      if (score > bestScore) {
        bestScore = score
        const d = new Date(record.date + 'T00:00:00')
        bestDay = t.dayNames[d.getDay()]
      }
    }

    return {
      data,
      avgCapacity: records.length > 0 ? totalCapacity / records.length : 0,
      overloadDays,
      bestDay: bestDay || '-',
    }
  }, [t])

  if (!stats) return null

  const hasData = stats.data.some(d => d.score > 0)

  return (
    <div className="space-y-4 pt-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-stone-800">{t.insightsTitle}</h2>
        <p className="text-sm text-stone-500 mt-1">{t.insightsSub}</p>
      </div>

      {hasData ? (
        <>
          <SoftCard>
            <h3 className="text-lg font-semibold text-stone-800 mb-4">{t.weeklyEnergy}</h3>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.data}>
                  <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} />
                  <YAxis hide domain={[0, 100]} />
                  <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                    {stats.data.map((entry, i) => (
                      <Cell
                        key={i}
                        fill={entry.overload ? '#fca5a5' : `hsl(${15 + i * 5}, 80%, ${75 - i * 3}%)`}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </SoftCard>

          <SoftCard>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">{t.weeklySummary}</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-rose-50 p-3 text-center">
                <p className="text-xs text-stone-500">{t.avgCapacity}</p>
                <p className="text-lg font-semibold text-stone-800">{stats.avgCapacity.toFixed(1)}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-3 text-center">
                <p className="text-xs text-stone-500">{t.overloadDays}</p>
                <p className="text-lg font-semibold text-stone-800">{stats.overloadDays}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                <p className="text-xs text-stone-500">{t.bestDay}</p>
                <p className="text-lg font-semibold text-stone-800">{t.weekPrefix}{stats.bestDay}</p>
              </div>
            </div>
          </SoftCard>

          <SoftCard>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">{t.insightsLabel}</h3>
            <div className="space-y-3">
              <InsightMessageCard
                message={t.insightAvg(stats.avgCapacity.toFixed(1), stats.avgCapacity >= 7)}
                variant="emerald"
              />
              {stats.overloadDays > 0 && (
                <InsightMessageCard
                  message={t.insightOverload(stats.overloadDays)}
                  variant="amber"
                />
              )}
            </div>
          </SoftCard>
        </>
      ) : (
        <SoftCard>
          <p className="text-sm text-stone-400 text-center py-8">{t.noData}</p>
        </SoftCard>
      )}
    </div>
  )
}
