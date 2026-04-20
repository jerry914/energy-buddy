import { useState, useEffect } from 'react'
import type { EBTask, Intensity, TaskCategory } from '../models/types'
import { db } from '../db/database'
import { useI18n } from '../i18n/context'

const intensities: Intensity[] = ['high', 'medium', 'low']
const categories: TaskCategory[] = ['deepWork', 'meeting', 'admin', 'learning']

interface Preset {
  name: string
  duration: number
  intensity: Intensity
  category: TaskCategory
}

function usePresets(): Preset[] {
  const [presets, setPresets] = useState<Preset[]>([])
  useEffect(() => {
    async function load() {
      const all = await db.tasks.toArray()
      const map = new Map<string, { task: EBTask; count: number }>()
      for (const t of all) {
        const existing = map.get(t.name)
        if (existing) {
          existing.count++
          if (t.date > existing.task.date) existing.task = t
        } else {
          map.set(t.name, { task: t, count: 1 })
        }
      }
      setPresets(
        [...map.values()]
          .sort((a, b) => b.count - a.count)
          .slice(0, 5)
          .map(({ task }) => ({
            name: task.name,
            duration: task.duration,
            intensity: task.intensity,
            category: task.category,
          }))
      )
    }
    load()
  }, [])
  return presets
}

export function TaskForm({
  onSubmit,
  onClose,
  initial,
}: {
  onSubmit: (name: string, duration: number, intensity: Intensity, category: TaskCategory) => void
  onClose: () => void
  initial?: EBTask
}) {
  const { t } = useI18n()
  const [name, setName] = useState(initial?.name ?? '')
  const [duration, setDuration] = useState(initial?.duration ?? 1)
  const [intensity, setIntensity] = useState<Intensity>(initial?.intensity ?? 'medium')
  const [category, setCategory] = useState<TaskCategory>(initial?.category ?? 'deepWork')
  const presets = usePresets()

  const isEdit = !!initial

  const intensityLabels: Record<Intensity, string> = {
    high: t.intensityHigh, medium: t.intensityMedium, low: t.intensityLow,
  }
  const categoryLabels: Record<TaskCategory, string> = {
    deepWork: t.catDeepWork, meeting: t.catMeeting, admin: t.catAdmin, learning: t.catLearning,
  }

  const applyPreset = (p: Preset) => {
    setName(p.name)
    setDuration(p.duration)
    setIntensity(p.intensity)
    setCategory(p.category)
  }

  const handleSubmit = () => {
    if (!name.trim()) return
    onSubmit(name.trim(), duration, intensity, category)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-end sm:items-center justify-center">
      <div className="rounded-t-3xl sm:rounded-3xl bg-white shadow-lg border border-rose-100 p-6 w-full max-w-sm space-y-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-stone-800">{isEdit ? t.editTask : t.newTask}</h3>
          <button onClick={onClose} className="text-stone-400 text-xl">×</button>
        </div>

        {!isEdit && presets.length > 0 && (
          <div>
            <label className="text-sm font-medium text-stone-700 block mb-2">{t.frequentTasks}</label>
            <div className="flex flex-wrap gap-2">
              {presets.map((p) => (
                <button
                  key={p.name}
                  onClick={() => applyPreset(p)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                    name === p.name
                      ? 'bg-rose-500 text-white'
                      : 'bg-rose-50 text-rose-700 border border-rose-200'
                  }`}
                >
                  {p.name}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <label className="text-sm font-medium text-stone-700 block mb-1">{t.taskName}</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t.taskPlaceholder}
            className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-rose-300"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700 block mb-1">
            {t.taskHours} <span className="text-rose-500">{duration}h</span>
          </label>
          <input
            type="range"
            min={0.5}
            max={8}
            step={0.5}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-full accent-rose-400"
          />
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700 block mb-2">{t.intensity}</label>
          <div className="flex gap-2">
            {intensities.map((i) => (
              <button
                key={i}
                onClick={() => setIntensity(i)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                  intensity === i
                    ? i === 'high' ? 'bg-rose-100 text-rose-700'
                      : i === 'medium' ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {intensityLabels[i]}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700 block mb-2">{t.category}</label>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`py-2 rounded-xl text-sm font-medium transition-colors ${
                  category === c ? 'bg-rose-100 text-rose-700' : 'bg-stone-100 text-stone-500'
                }`}
              >
                {categoryLabels[c]}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="w-full rounded-full py-3 bg-rose-500 text-white font-medium shadow-sm hover:bg-rose-600 transition-colors disabled:opacity-40"
        >
          {isEdit ? t.save : t.add}
        </button>
      </div>
    </div>
  )
}
