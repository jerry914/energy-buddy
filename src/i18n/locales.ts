export const locales = {
  'zh-TW': {
    // App
    appName: 'Energy Buddy',
    appTagline: '今天也溫柔地安排自己',
    appSubtitle: '不是把時間塞滿，而是照顧今天的你。',
    appFooter: 'Energy Buddy · 照顧今天的自己 🌷',

    // Tabs
    tabHome: '首頁',
    tabLog: '紀錄',
    tabInsights: '週報',
    tabSettings: '設定',

    // Energy card
    energyPrediction: '今日精力預測',
    used: '已用',
    capacity: '容量',
    overloaded: '已超載',
    remaining: '剩餘',
    sleep: '睡眠',
    morningStat: '晨間狀態',

    // Tasks
    todayTasks: '今日安排',
    todayTasksSub: '依照精力排序，不是依照焦慮排序。',
    addNew: '＋ 新增',
    noTasks: '還沒有任務，新增一個吧 🌱',
    hours: '小時',

    // Reminders
    todayReminders: '今日提醒',
    todayRemindersSub: '給今天的自己一點剛剛好的提醒。',

    // Weekly chart
    weeklyChart: '本週能量軌跡',
    weeklyChartSub: '觀察節奏，比追求完美更重要。',
    dayNames: ['日', '一', '二', '三', '四', '五', '六'] as string[],

    // Check-in
    checkInTitle: '早安，今天感覺如何？',
    checkInSub: '輕輕回答就好，不需要精準',
    sleepQuestion: '昨晚睡了幾小時？',
    morningEnergy: '晨間精力',
    startDay: '開始今天 🌸',

    // Task form
    editTask: '編輯任務',
    newTask: '新增任務',
    frequentTasks: '常用任務',
    taskName: '任務名稱',
    taskPlaceholder: '例：寫論文、開會...',
    taskHours: '時數',
    intensity: '強度',
    category: '類型',
    save: '儲存',
    add: '新增',

    // Intensity
    intensityHigh: '高',
    intensityMedium: '中',
    intensityLow: '低',
    intensitySuffix: '強度',

    // Categories
    catDeepWork: '深度工作',
    catMeeting: '會議',
    catAdmin: '行政',
    catLearning: '學習',

    // Smart planner
    planFull: '適合 1 件高強度 + 2 件中強度',
    planModerate: '適合 1 件高強度 + 1 件中強度 + 1 件低強度',
    planRest: '今天適合慢慢來，以低強度任務為主',

    // Reminders
    reminderHighMultiple: '你今天已經排了多個高強度任務，下午建議不要再加新的 deep work。',
    reminderHighOne: '你今天已經排了 1 個高強度任務，下午建議不要再加新的 deep work。',
    reminderLowCapacity: '今天精力偏低，安排一件最重要的事就很好。',
    reminderNearLimit: '精力快到上限了，剩下的時間做輕鬆的事吧。',
    reminderOverloaded: '今天已經超載了，好好休息，明天再來。',
    reminderDefault: '如果下午累了，改做輕量任務也算有照顧進度。',

    // Log page
    logTitle: '任務紀錄📝',
    logSub: '回顧每一天的安排',
    todayTasksLabel: '今日任務',
    dateTasksLabel: (d: string) => `${d} 的任務`,
    taskCount: (n: number) => `共 ${n} 項任務`,
    noTasksDate: '這天沒有任務 🍃',

    // Insights page
    insightsTitle: '週報',
    insightsSub: '觀察自己的節奏',
    weeklyEnergy: '本週能量',
    weeklySummary: '本週摘要',
    avgCapacity: '平均容量',
    overloadDays: '超載天數',
    bestDay: '最佳日',
    weekPrefix: '週',
    insightsLabel: '洞察',
    insightAvg: (v: string, good: boolean) =>
      `這週平均精力容量為 ${v}，${good ? '整體狀態不錯！' : '記得適時休息。'}`,
    insightOverload: (n: number) =>
      `有 ${n} 天超載了。試著在超載隔天安排輕鬆的任務🫂。`,
    noData: '還沒有足夠的資料 🌱 使用幾天之後就能看到週報了',

    // Settings page
    settingsTitle: '設定',
    settingsSub: '調整你的精力模型',
    intensityWeights: '強度權重',
    highIntensity: '高強度',
    mediumIntensity: '中強度',
    lowIntensity: '低強度',
    predictionModel: '預測模型',
    dailyBudget: '每日精力預算',
    sleepWeight: '睡眠權重',
    morningWeight: '晨間權重',
    resetDefaults: '重設為預設值',
    language: '語言',
    langAuto: '跟隨系統',
    langZhTW: '繁體中文',
    langEn: 'English',
  },

  en: {
    appName: 'Energy Buddy',
    appTagline: 'Gently plan your day',
    appSubtitle: "It's not about filling time, but caring for yourself.",
    appFooter: 'Energy Buddy · Care for yourself today 🌷',

    tabHome: 'Home',
    tabLog: 'Log',
    tabInsights: 'Insights',
    tabSettings: 'Settings',

    energyPrediction: "Today's Energy",
    used: 'Used',
    capacity: 'Capacity',
    overloaded: 'Overloaded',
    remaining: 'Remaining',
    sleep: 'Sleep',
    morningStat: 'Morning',
    todayTasks: "Today's Tasks",
    todayTasksSub: 'Sorted by energy, not anxiety.',
    addNew: '+ Add',
    noTasks: 'No tasks yet, add one 🌱',
    hours: 'hrs',

    todayReminders: 'Reminders',
    todayRemindersSub: 'A gentle nudge for today.',

    weeklyChart: 'Weekly Energy',
    weeklyChartSub: 'Observing your rhythm matters more than perfection.',
    dayNames: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'] as string[],

    checkInTitle: 'Good morning, how are you?',
    checkInSub: "Just a rough feeling is fine",
    sleepQuestion: 'Hours of sleep last night?',
    morningEnergy: 'Morning energy',
    startDay: "Let's go 🌸",

    editTask: 'Edit Task',
    newTask: 'New Task',
    frequentTasks: 'Frequent',
    taskName: 'Task name',
    taskPlaceholder: 'e.g. Write paper, Meeting...',
    taskHours: 'Hours',
    intensity: 'Intensity',
    category: 'Category',
    save: 'Save',
    add: 'Add',

    intensityHigh: 'High',
    intensityMedium: 'Med',
    intensityLow: 'Low',
    intensitySuffix: '',

    catDeepWork: 'Deep Work',
    catMeeting: 'Meeting',
    catAdmin: 'Admin',
    catLearning: 'Learning',

    planFull: 'Good for 1 high + 2 medium tasks',
    planModerate: 'Good for 1 high + 1 medium + 1 low task',
    planRest: 'Take it easy — light tasks only today',

    reminderHighMultiple: 'You have multiple high-intensity tasks. Avoid adding more deep work this afternoon.',
    reminderHighOne: 'You have 1 high-intensity task. Avoid adding more deep work this afternoon.',
    reminderLowCapacity: 'Energy is low today. Finishing one important thing is enough.',
    reminderNearLimit: "You're near your limit. Keep the rest of the day light.",
    reminderOverloaded: "You're overloaded today. Rest well and try again tomorrow.",
    reminderDefault: 'If you feel tired later, switching to lighter tasks still counts as progress.',

    logTitle: 'Task Log 📝',
    logSub: 'Review your days',
    todayTasksLabel: "Today's Tasks",
    dateTasksLabel: (d: string) => `Tasks on ${d}`,
    taskCount: (n: number) => `${n} task${n !== 1 ? 's' : ''}`,
    noTasksDate: 'No tasks on this day 🍃',

    insightsTitle: 'Insights',
    insightsSub: 'Observe your rhythm',
    weeklyEnergy: 'Weekly Energy',
    weeklySummary: 'Weekly Summary',
    avgCapacity: 'Avg Capacity',
    overloadDays: 'Overload Days',
    bestDay: 'Best Day',
    weekPrefix: '',
    insightsLabel: 'Insights',
    insightAvg: (v: string, good: boolean) =>
      `Average capacity this week: ${v}. ${good ? 'Looking good!' : 'Remember to rest.'}`,
    insightOverload: (n: number) =>
      `${n} day${n !== 1 ? 's' : ''} overloaded. Try scheduling lighter tasks the day after.`,
    noData: 'Not enough data yet 🌱 Check back after a few days',

    settingsTitle: 'Settings',
    settingsSub: 'Adjust your energy model',
    intensityWeights: 'Intensity Weights',
    highIntensity: 'High',
    mediumIntensity: 'Medium',
    lowIntensity: 'Low',
    predictionModel: 'Prediction Model',
    dailyBudget: 'Daily Energy Budget',
    sleepWeight: 'Sleep Weight',
    morningWeight: 'Morning Weight',
    resetDefaults: 'Reset to Defaults',
    language: 'Language',
    langAuto: 'System Default',
    langZhTW: '繁體中文',
    langEn: 'English',
  },
}

export type Locale = keyof typeof locales
export type Translations = typeof locales['zh-TW']
