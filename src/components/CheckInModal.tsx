import { useState } from 'react'
import { useI18n } from '../i18n/context'

const energyEmojis = ['😴', '😪', '😐', '🙂', '😊', '😄', '🤩', '💪', '🔥', '✨']

export function CheckInModal({ onSubmit }: { onSubmit: (sleep: number, morning: number) => void }) {
  const [sleep, setSleep] = useState(7)
  const [morning, setMorning] = useState(6)
  const { t } = useI18n()

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="rounded-3xl bg-white shadow-lg border border-rose-100 p-6 w-full max-w-sm space-y-6">
        <div className="text-center">
          <span className="text-3xl">🌷</span>
          <h2 className="text-xl font-semibold text-stone-800 mt-2">{t.checkInTitle}</h2>
          <p className="text-sm text-stone-500 mt-1">{t.checkInSub}</p>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700 block mb-2">
            {t.sleepQuestion} <span className="text-rose-500 font-semibold">{sleep}h</span>
          </label>
          <input
            type="range"
            min={0}
            max={12}
            step={0.5}
            value={sleep}
            onChange={(e) => setSleep(Number(e.target.value))}
            className="w-full accent-rose-400"
          />
          <div className="flex justify-between text-xs text-stone-400 mt-1">
            <span>0h</span>
            <span>12h</span>
          </div>
        </div>

        <div>
          <label className="text-sm font-medium text-stone-700 block mb-2">
            {t.morningEnergy} <span className="text-rose-500 font-semibold">{morning}/10</span> {energyEmojis[morning - 1]}
          </label>
          <input
            type="range"
            min={1}
            max={10}
            step={1}
            value={morning}
            onChange={(e) => setMorning(Number(e.target.value))}
            className="w-full accent-rose-400"
          />
          <div className="flex justify-between text-xs text-stone-400 mt-1">
            <span>1 😴</span>
            <span>10 ✨</span>
          </div>
        </div>

        <button
          onClick={() => onSubmit(sleep, morning)}
          className="w-full rounded-full py-3 bg-rose-500 text-white font-medium shadow-sm hover:bg-rose-600 transition-colors"
        >
          {t.startDay}
        </button>
      </div>
    </div>
  )
}
