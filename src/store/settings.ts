import { create } from 'zustand'

type Language = 'ru' | 'en'
type Theme = 'light' | 'dark'

interface SettingsState {
  language: Language
  theme: Theme
  setLanguage: (language: Language) => void
  setTheme: (theme: Theme) => void
  toggleLanguage: () => void
  toggleTheme: () => void
}

// Helper function to apply theme to document
const applyTheme = (theme: Theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  // For backward compatibility with existing dark mode implementation
  if (theme === 'dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}

// Initial values default to browser preferences or fallback values
export const useSettingsStore = create<SettingsState>((set) => ({
  // Default values (no persistence handling here)
  language: 'ru',
  theme: 'light',

  // Actions
  setLanguage: (language) => set({ language }),
  setTheme: (theme) => {
    applyTheme(theme)
    set({ theme })
  },
  toggleLanguage: () =>
    set((state) => ({
      language: state.language === 'ru' ? 'en' : 'ru',
    })),
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light'
      applyTheme(newTheme)
      return { theme: newTheme }
    }),
}))

// Initialize theme on store creation
applyTheme('light')
