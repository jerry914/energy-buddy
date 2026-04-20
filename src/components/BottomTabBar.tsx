import { useI18n } from '../i18n/context'

const tabKeys = ['home', 'log', 'insights', 'settings'] as const
export type TabKey = (typeof tabKeys)[number]

export function BottomTabBar({
  active,
  onChange,
}: {
  active: TabKey
  onChange: (tab: TabKey) => void
}) {
  const { t } = useI18n()
  const labels: Record<TabKey, string> = {
    home: t.tabHome,
    log: t.tabLog,
    insights: t.tabInsights,
    settings: t.tabSettings,
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-2 rounded-3xl bg-white/80 backdrop-blur border border-rose-100 shadow-sm p-2">
        {tabKeys.map((key) => (
          <button
            key={key}
            onClick={() => onChange(key)}
            className={`py-3 rounded-2xl text-sm font-medium transition-colors ${
              active === key
                ? 'bg-rose-100 text-rose-700'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            {labels[key]}
          </button>
        ))}
      </div>
    </div>
  )
}
