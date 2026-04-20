import type { EBTask, TaskCategory } from '../models/types'
import { IntensityChip } from './IntensityChip'
import { useI18n } from '../i18n/context'

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
  const { t } = useI18n()
  const catLabels: Record<TaskCategory, string> = {
    deepWork: t.catDeepWork,
    meeting: t.catMeeting,
    admin: t.catAdmin,
    learning: t.catLearning,
  }

  return (
    <div className={`rounded-2xl bg-stone-50 p-4 flex items-center justify-between transition-opacity ${task.isCompleted ? 'opacity-60' : ''}`}>
      <div className="flex-1 min-w-0 cursor-pointer" onClick={onEdit}>
        <div className="flex items-center gap-2 flex-wrap">
          <p className={`font-medium ${task.isCompleted ? 'line-through' : ''}`}>{task.name}</p>
          <IntensityChip intensity={task.intensity} />
        </div>
        <p className="text-sm mt-1 text-stone-600">
          {catLabels[task.category]} · {task.duration} {t.hours}
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
