import { useEffect } from 'react'
import { useSettingsStore } from '@/store/settings'

interface ThemeProviderProps {
  children: React.ReactNode
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const { theme } = useSettingsStore()

  useEffect(() => {
    // Apply the theme when the component mounts and when theme changes
    document.documentElement.setAttribute('data-theme', theme)

    if (theme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [theme])

  return children
}
