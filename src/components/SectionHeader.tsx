import type { ReactNode } from 'react'

export function SectionHeader({
  title,
  subtitle,
  trailing,
}: {
  title: string
  subtitle: string
  trailing?: ReactNode
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div>
        <h3 className="text-lg font-semibold text-stone-800">{title}</h3>
        <p className="text-sm text-stone-600">{subtitle}</p>
      </div>
      {trailing}
    </div>
  )
}
