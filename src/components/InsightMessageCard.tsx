export function InsightMessageCard({
  message,
  variant = 'rose',
}: {
  message: string
  variant?: 'rose' | 'amber' | 'emerald'
}) {
  const bg = {
    rose: 'bg-rose-50',
    amber: 'bg-amber-50',
    emerald: 'bg-emerald-50 text-emerald-700',
  }
  return (
    <div className={`rounded-2xl p-4 text-sm ${bg[variant]}`}>
      {message}
    </div>
  )
}
