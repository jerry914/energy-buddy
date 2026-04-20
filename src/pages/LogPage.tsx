import { useState } from 'react'
import { SoftCard } from '../components/SoftCard'
import { SectionHeader } from '../components/SectionHeader'
import { TaskRowCard } from '../components/TaskRowCard'
import { TaskForm } from '../components/TaskForm'
import { useTasks } from '../hooks/useTasks'
import { useI18n } from '../i18n/context'
import { todayStr } from '../db/database'
import type { EBTask } from '../models/types'

export function LogPage() {
  const { t } = useI18n()
  const [date, setDate] = useState(todayStr())
  const { tasks, addTask, toggleComplete, updateTask, deleteTask } = useTasks(date)
  const [showForm, setShowForm] = useState(false)
  const [editingTask, setEditingTask] = useState<EBTask | null>(null)

  return (
    <div className="space-y-4 pt-4">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-stone-800">{t.logTitle}</h2>
        <p className="text-sm text-stone-500 mt-1">{t.logSub}</p>
      </div>

      <div className="flex justify-center">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="rounded-full border border-rose-200 px-4 py-2 text-sm bg-white/80 text-stone-700 focus:outline-none focus:border-rose-400"
        />
      </div>

      <SoftCard>
        <SectionHeader
          title={date === todayStr() ? t.todayTasksLabel : t.dateTasksLabel(date)}
          subtitle={t.taskCount(tasks.length)}
          trailing={
            <button
              onClick={() => setShowForm(true)}
              className="rounded-full px-4 py-2 bg-rose-500 text-white text-sm shadow-sm hover:bg-rose-600 transition-colors"
            >
              {t.addNew}
            </button>
          }
        />
        {tasks.length === 0 ? (
          <p className="text-sm text-stone-400 text-center py-8">{t.noTasksDate}</p>
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
