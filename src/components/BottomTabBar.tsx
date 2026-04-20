const tabs = [
  { key: 'home', label: '首頁' },
  { key: 'log', label: '紀錄' },
  { key: 'insights', label: '週報' },
  { key: 'settings', label: '設定' },
] as const

export type TabKey = (typeof tabs)[number]['key']

export function BottomTabBar({
  active,
  onChange,
}: {
  active: TabKey
  onChange: (tab: TabKey) => void
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="max-w-md mx-auto grid grid-cols-4 gap-2 rounded-3xl bg-white/80 backdrop-blur border border-rose-100 shadow-sm p-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`py-3 rounded-2xl text-sm font-medium transition-colors ${
              active === tab.key
                ? 'bg-rose-100 text-rose-700'
                : 'text-stone-600 hover:text-stone-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  )
}
