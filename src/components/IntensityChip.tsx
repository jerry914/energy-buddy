import type { Intensity } from '../models/types'
import { useI18n } from '../i18n/context'

const styles: Record<Intensity, string> = {
  high: 'bg-rose-100 text-rose-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
}

export function IntensityChip({ intensity }: { intensity: Intensity }) {
  const { t } = useI18n()
  const labels: Record<Intensity, string> = {
    high: t.intensityHigh,
    medium: t.intensityMedium,
    low: t.intensityLow,
  }
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[intensity]}`}>
      {labels[intensity]}{t.intensitySuffix}
    </span>
  )
}
