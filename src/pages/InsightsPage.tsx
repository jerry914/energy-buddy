import { useState, useEffect } from 'react'
import { SoftCard } from '../components/SoftCard'
import { InsightMessageCard } from '../components/InsightMessageCard'
import { db } from '../db/database'
import type { DailyEnergy } from '../models/types'
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
} from 'recharts'

interface WeekStats {
  data: { day: string; score: number; overload: boolean }[]
  avgCapacity: number
  overloadDays: number
  bestDay: string
}

export function InsightsPage() {
  const [stats, setStats] = useState<WeekStats | null>(null)

  useEffect(() => {
    async function load() {
      const today = new Date()
      const dayNames = ['日', '一', '二', '三', '四', '五', '六']
      const data: WeekStats['data'] = []
      let totalCapacity = 0
      let overloadDays = 0
      let bestScore = 0
      let bestDay = ''

      for (let i = 6; i >= 0; i--) {
        const d = new Date(today)
        d.setDate(d.getDate() - i)
        const dateStr = d.toISOString().slice(0, 10)
        const record: DailyEnergy | undefined = await db.dailyEnergy.where('date').equals(dateStr).first()
        const score = record ? Math.round(record.predictedEnergy) : 0
        const overload = record?.overloadFlag ?? false

        data.push({ day: dayNames[d.getDay()], score, overload })

        if (record) {
          totalCapacity += record.predictedEnergy / 10
          if (overload) overloadDays++
          if (score > bestScore) {
            bestScore = score
            bestDay = dayNames[d.getDay()]
          }
        }
      }

      const daysWithData = data.filter(d => d.score > 0).length
      setStats({
        data,
        avgCapacity: daysWithData > 0 ? totalCapacity / daysWithData : 0,
        overloadDays,
        bestDay: bestDay || '-',
      })
    }
    load()
  }, [])

  if (!stats) return null

  const hasData = stats.data.some(d => d.score > 0)

  return (
    <div className="space-y-4 pt-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-stone-800">週報</h2>
        <p className="text-sm text-stone-500 mt-1">觀察自己的節奏</p>
      </div>

      {hasData ? (
        <>
          <SoftCard>
            <h3 className="text-lg font-semibold text-stone-800 mb-4">本週能量</h3>
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
            <h3 className="text-lg font-semibold text-stone-800 mb-3">本週摘要</h3>
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-2xl bg-rose-50 p-3 text-center">
                <p className="text-xs text-stone-500">平均容量</p>
                <p className="text-lg font-semibold text-stone-800">{stats.avgCapacity.toFixed(1)}</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-3 text-center">
                <p className="text-xs text-stone-500">超載天數</p>
                <p className="text-lg font-semibold text-stone-800">{stats.overloadDays}</p>
              </div>
              <div className="rounded-2xl bg-emerald-50 p-3 text-center">
                <p className="text-xs text-stone-500">最佳日</p>
                <p className="text-lg font-semibold text-stone-800">週{stats.bestDay}</p>
              </div>
            </div>
          </SoftCard>

          <SoftCard>
            <h3 className="text-lg font-semibold text-stone-800 mb-3">洞察</h3>
            <div className="space-y-3">
              <InsightMessageCard
                message={`這週平均精力容量為 ${stats.avgCapacity.toFixed(1)}，${
                  stats.avgCapacity >= 7 ? '整體狀態不錯！' : '記得適時休息。'
                }`}
                variant="emerald"
              />
              {stats.overloadDays > 0 && (
                <InsightMessageCard
                  message={`有 ${stats.overloadDays} 天超載了。試著在超載隔天安排輕鬆的任務🫂。`}
                  variant="amber"
                />
              )}
            </div>
          </SoftCard>
        </>
      ) : (
        <SoftCard>
          <p className="text-sm text-stone-400 text-center py-8">
            還沒有足夠的資料 🌱 使用幾天之後就能看到週報了
          </p>
        </SoftCard>
      )}
    </div>
  )
}
