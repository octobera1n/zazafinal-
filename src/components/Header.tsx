import { Link } from '@tanstack/react-router'
import { Globe, Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useSettingsStore } from '@/store/settings'

export default function Header() {
  const { language, theme, toggleLanguage, toggleTheme } = useSettingsStore()

  const translations = {
    ru: {
      home: 'Главная',
      about: 'О курсе',
      program: 'Программа',
      teachers: 'Преподаватели',
      contacts: 'Контакты',
      dark: 'Тёмная',
      light: 'Светлая',
    },
    en: {
      home: 'Home',
      about: 'About',
      program: 'Program',
      teachers: 'Teachers',
      contacts: 'Contacts',
      dark: 'Dark',
      light: 'Light',
    },
  }

  const t = translations[language]

  return (
    <header className="fixed top-0 left-0 w-full p-4 flex items-center justify-between bg-white/30 dark:bg-gray-800/30 backdrop-blur-md shadow-md z-50">
      <nav className="flex space-x-6">
        <Link
          to="/"
          className="text-base font-medium text-gray-800 dark:text-gray-100 hover:underline [&.active]:font-bold"
          activeProps={{ className: 'font-bold' }}
        >
          {t.home}
        </Link>
        <Link
          to="/about"
          className="text-base font-medium text-gray-800 dark:text-gray-100 hover:underline [&.active]:font-bold"
          activeProps={{ className: 'font-bold' }}
        >
          {t.about}
        </Link>
        <Link
          to="/programme"
          className="text-base font-medium text-gray-800 dark:text-gray-100 hover:underline [&.active]:font-bold"
          activeProps={{ className: 'font-bold' }}
        >
          {t.program}
        </Link>
        <Link
          to="/teachers"
          className="text-base font-medium text-gray-800 dark:text-gray-100 hover:underline [&.active]:font-bold"
          activeProps={{ className: 'font-bold' }}
        >
          {t.teachers}
        </Link>
        <Link
          to="/contact"
          className="text-base font-medium text-gray-800 dark:text-gray-100 hover:underline [&.active]:font-bold"
          activeProps={{ className: 'font-bold' }}
        >
          {t.contacts}
        </Link>
      </nav>
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleLanguage}
          className="flex items-center space-x-1"
        >
          <Globe className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {language === 'ru' ? 'EN' : 'RU'}
          </span>
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          className="flex items-center space-x-1"
        >
          {theme === 'light' ? (
            <Moon className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          ) : (
            <Sun className="h-4 w-4 text-gray-800 dark:text-gray-100" />
          )}
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {theme === 'light' ? t.dark : t.light}
          </span>
        </Button>
      </div>
    </header>
  )
}
