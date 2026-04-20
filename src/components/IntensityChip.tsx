import type { Intensity } from '../models/types'
import { INTENSITY_LABELS } from '../models/types'

const styles: Record<Intensity, string> = {
  high: 'bg-rose-100 text-rose-700',
  medium: 'bg-amber-100 text-amber-700',
  low: 'bg-emerald-100 text-emerald-700',
}

export function IntensityChip({ intensity }: { intensity: Intensity }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${styles[intensity]}`}>
      {INTENSITY_LABELS[intensity]}強度
    </span>
  )
}
