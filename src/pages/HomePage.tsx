import { useState } from 'react'
import { useLiveQuery } from 'dexie-react-hooks'
import { SoftCard } from '../components/SoftCard'
import { SectionHeader } from '../components/SectionHeader'
import { TaskRowCard } from '../components/TaskRowCard'
import { InsightMessageCard } from '../components/InsightMessageCard'
import { TaskForm } from '../components/TaskForm'
import type { EBTask } from '../models/types'
import { useDailyEnergy } from '../hooks/useDailyEnergy'
import { useTasks } from '../hooks/useTasks'
import { calcEnergyCapacity, calcActualEnergyUsed } from '../logic/energyCalculator'
import { suggestedPlan, suggestionText, energyEmoji, generateReminders } from '../logic/smartPlanner'
import { db } from '../db/database'
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell,
} from 'recharts'

const DAY_NAMES = ['日', '一', '二', '三', '四', '五', '六']

function getWeekDates(): string[] {
  const today = new Date()
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today)
    d.setDate(d.getDate() - (6 - i))
    return d.toISOString().slice(0, 10)
  })
}

export function HomePage() {
  const { energy, settings } = useDailyEnergy()
  const { tasks, addTask, toggleComplete, updateTask, deleteTask } = useTasks()
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<EBTask | null>(null)

  const weekDates = getWeekDates()
  const weekRecords = useLiveQuery(
    async () => {
      const records = await db.dailyEnergy.where('date').anyOf(weekDates).toArray()
      const map = new Map(records.map(r => [r.date, r]))
      return weekDates.map(dateStr => {
        const d = new Date(dateStr + 'T00:00:00')
        const record = map.get(dateStr)
        return {
          day: DAY_NAMES[d.getDay()],
          score: record ? Math.round(record.predictedEnergy) : 0,
        }
      })
    },
    [],
    []
  )

  const capacity = energy && settings
    ? calcEnergyCapacity(energy.sleepHours, energy.morningEnergy, settings)
    : 0
  const predicted = energy?.predictedEnergy ?? 0
  const actualUsed = calcActualEnergyUsed(tasks)
  const plan = suggestedPlan(capacity)
  const emoji = energyEmoji(capacity)
  const highCount = tasks.filter(t => t.intensity === 'high').length
  const reminders = generateReminders(capacity, highCount, actualUsed)

  return (
    <div className="space-y-4">
      <div className="text-center pt-4 pb-2">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/70 border border-rose-100 shadow-sm">
          <span className="text-lg">🌷</span>
          <span className="text-sm font-medium">Energy Buddy</span>
        </div>
        <h1 className="text-3xl font-semibold mt-4 tracking-tight text-stone-800">
          今天也溫柔地安排自己
        </h1>
        <p className="mt-2 text-sm text-stone-600">
          不是把時間塞滿，而是照顧今天的你。
        </p>
      </div>

      <SoftCard>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-stone-500">今日精力預測</p>
            <h2 className="text-4xl font-semibold mt-1 text-stone-800">
              {Math.round(predicted)}
            </h2>
            <p className="text-sm text-emerald-600 mt-1">{suggestionText(plan)}</p>
          </div>
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-rose-200 via-orange-100 to-amber-100 flex items-center justify-center shadow-inner text-4xl">
            {emoji}
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-stone-500">已用 {actualUsed.toFixed(1)} / 容量 {capacity.toFixed(1)}</span>
            <span className={`font-medium ${
              actualUsed > capacity ? 'text-rose-500' : actualUsed > capacity * 0.8 ? 'text-amber-500' : 'text-emerald-600'
            }`}>
              {actualUsed > capacity
                ? '已超載'
                : `剩餘 ${(capacity - actualUsed).toFixed(1)}`}
            </span>
          </div>
          <div className="h-3 rounded-full bg-stone-100 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min((actualUsed / (capacity || 1)) * 100, 100)}%`,
                background: 'linear-gradient(90deg, #f87171, #fb923c, #fbbf24, #a3e635, #34d399, #38bdf8, #a78bfa)',
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4">
          <div className="rounded-2xl bg-rose-50 p-3">
            <p className="text-xs text-stone-500">睡眠</p>
            <p className="text-lg font-semibold text-stone-800">{energy?.sleepHours ?? '-'}h</p>
          </div>
          <div className="rounded-2xl bg-orange-50 p-3">
            <p className="text-xs text-stone-500">晨間狀態</p>
            <p className="text-lg font-semibold text-stone-800">{energy?.morningEnergy ?? '-'}/10</p>
          </div>
          <div className="rounded-2xl bg-amber-50 p-3">
            <p className="text-xs text-stone-500">容量</p>
            <p className="text-lg font-semibold text-stone-800">{capacity.toFixed(1)}</p>
          </div>
        </div>
      </SoftCard>

      <SoftCard>
        <SectionHeader
          title="今日安排"
          subtitle="依照精力排序，不是依照焦慮排序。"
          trailing={
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full px-4 py-2 bg-rose-500 text-white text-sm shadow-sm hover:bg-rose-600 transition-colors"
            >
              ＋ 新增
            </button>
          }
        />
        {tasks.length === 0 ? (
          <p className="text-sm text-stone-400 text-center py-6">還沒有任務，新增一個吧 🌱</p>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <TaskRowCard
                key={task.id}
                task={task}
                onToggleComplete={() => task.id && toggleComplete(task.id)}
                onEdit={() => setEditingTask(task)}
                onDelete={() => task.id && deleteTask(task.id)}
              />
            ))}
          </div>
        )}
      </SoftCard>

      <SoftCard>
        <SectionHeader
          title="今日提醒"
          subtitle="給今天的自己一點剛剛好的提醒。"
          trailing={<span className="text-2xl">🫶</span>}
        />
        <div className="space-y-3">
          {reminders.map((msg, i) => (
            <InsightMessageCard
              key={i}
              message={msg}
              variant={i === 0 ? 'rose' : 'amber'}
            />
          ))}
        </div>
      </SoftCard>

      {weekRecords.some(d => d.score > 0) && (
        <SoftCard>
          <SectionHeader
            title="本週能量軌跡"
            subtitle="觀察節奏，比追求完美更重要。"
          />
          <div className="h-40">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekRecords}>
                <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#78716c' }} axisLine={false} tickLine={false} />
                <YAxis hide domain={[0, 100]} />
                <Bar dataKey="score" radius={[8, 8, 0, 0]}>
                  {weekRecords.map((_, i) => (
                    <Cell key={i} fill={`hsl(${15 + i * 5}, 80%, ${75 - i * 3}%)`} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </SoftCard>
      )}

      {showForm && (
        <TaskForm
          onSubmit={(name, duration, intensity, category) => addTask(name, duration, intensity, category)}
          onClose={() => setShowForm(false)}
        />
      )}

      {editingTask && (
        <TaskForm
          initial={editingTask}
          onSubmit={(name, duration, intensity, category) => {
            if (editingTask.id) updateTask(editingTask.id, { name, duration, intensity, category })
          }}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  )
}
