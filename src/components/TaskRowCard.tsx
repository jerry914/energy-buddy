import type { EBTask } from '../models/types'
import { CATEGORY_LABELS } from '../models/types'
import { IntensityChip } from './IntensityChip'

export function TaskRowCard({
  task,
  onToggleComplete,
  onEdit,
  onDelete,
}: {
  task: EBTask
  onToggleComplete: () => void
  onEdit: () => void
  onDelete: () => void
}) {
  return (
    <div className={`rounded-2xl bg-stone-50 p-4 flex items-center justify-between transition-opacity ${task.isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex-1 min-w-0 cursor-pointer" onClick={onEdit}>
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`font-medium ${task.isCompleted ? 'line-through' : ''}`}>{task.name}</p>
          <IntensityChip intensity={task.intensity} />
        </div>
        <p className="text-sm mt-1 text-stone-600">
          {CATEGORY_LABELS[task.category]} · {task.duration} 小時
        </p>
      </div>
      <div className="flex items-center gap-2 ml-3">
        <button onClick={onToggleComplete} className="text-xl">
          {task.isCompleted ? '❤️' : '🤍'}
        </button>
        <button onClick={onDelete} className="text-lg opacity-40 hover:opacity-100">
          ×
        </button>
      </div>
    </div>
  )
}
