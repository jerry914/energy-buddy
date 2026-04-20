import { useState, useEffect } from 'react'
import { SoftCard } from '../components/SoftCard'
import { db, getSettings } from '../db/database'
import type { AppSettings } from '../models/types'
import { DEFAULT_SETTINGS } from '../models/types'

export function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(DEFAULT_SETTINGS)

  useEffect(() => {
    getSettings().then(setSettings)
  }, [])

  const update = async (patch: Partial<AppSettings>) => {
    const next = { ...settings, ...patch }
    setSettings(next)
    await db.settings.put(next)
  }

  const reset = async () => {
    setSettings(DEFAULT_SETTINGS)
    await db.settings.put(DEFAULT_SETTINGS)
  }

  return (
    <div className="space-y-4 pt-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-stone-800">設定</h2>
        <p className="text-sm text-stone-500 mt-1">調整你的精力模型</p>
      </div>

      <SoftCard>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">強度權重</h3>
        <div className="space-y-4">
          <SliderRow label="高強度" value={settings.highWeight} min={0.5} max={3} step={0.1}
            onChange={(v) => update({ highWeight: v })} />
          <SliderRow label="中強度" value={settings.mediumWeight} min={0.5} max={3} step={0.1}
            onChange={(v) => update({ mediumWeight: v })} />
          <SliderRow label="低強度" value={settings.lowWeight} min={0.1} max={2} step={0.1}
            onChange={(v) => update({ lowWeight: v })} />
        </div>
      </SoftCard>

      <SoftCard>
        <h3 className="text-lg font-semibold text-stone-800 mb-4">預測模型</h3>
        <div className="space-y-4">
          <SliderRow label="每日精力預算" value={settings.dailyEnergyBudget} min={5} max={20} step={1}
            onChange={(v) => update({ dailyEnergyBudget: v })} />
          <SliderRow label="睡眠權重" value={settings.sleepWeight} min={0} max={1} step={0.05}
            onChange={(v) => update({ sleepWeight: v, morningWeight: Math.round((1 - v) * 100) / 100 })} />
          <SliderRow label="晨間權重" value={settings.morningWeight} min={0} max={1} step={0.05}
            onChange={(v) => update({ morningWeight: v, sleepWeight: Math.round((1 - v) * 100) / 100 })} />
        </div>
      </SoftCard>

      <SoftCard>
        <button
          onClick={reset}
          className="w-full rounded-full py-3 bg-stone-100 text-stone-600 font-medium hover:bg-stone-200 transition-colors"
        >
          重設為預設值
        </button>
      </SoftCard>

      <div className="text-center text-xs text-stone-400 pb-4">
        Energy Buddy · 照顧今天的自己 🌷
      </div>
    </div>
  )
}

function SliderRow({
  label, value, min, max, step, onChange,
}: {
  label: string; value: number; min: number; max: number; step: number
  onChange: (v: number) => void
}) {
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-stone-600">{label}</span>
        <span className="text-rose-500 font-medium">{value.toFixed(step < 1 ? (step < 0.1 ? 2 : 1) : 0)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-rose-400"
      />
    </div>
  )
}
