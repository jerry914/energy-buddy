import { useState } from 'react'
import { BottomTabBar, type TabKey } from './components/BottomTabBar'
import { CheckInModal } from './components/CheckInModal'
import { HomePage } from './pages/HomePage'
import { LogPage } from './pages/LogPage'
import { InsightsPage } from './pages/InsightsPage'
import { SettingsPage } from './pages/SettingsPage'
import { useDailyEnergy } from './hooks/useDailyEnergy'

export default function App() {
  const [tab, setTab] = useState<TabKey>('home')
  const { needsCheckIn, checkIn } = useDailyEnergy()

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 via-orange-50 to-amber-50 text-stone-800">
      {needsCheckIn && <CheckInModal onSubmit={checkIn} />}
      <div className="max-w-md mx-auto px-4 pb-28">
        {tab === 'home' && <HomePage />}
        {tab === 'log' && <LogPage />}
        {tab === 'insights' && <InsightsPage />}
        {tab === 'settings' && <SettingsPage />}
      </div>
      <BottomTabBar active={tab} onChange={setTab} />
    </div>
  )
}
