import { createFileRoute } from '@tanstack/react-router'
import {
  ExternalLink,
  File,
  FileText,
  Folder,
  Mic2,
  Users,
  Video,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSettingsStore } from '@/store/settings'

export const Route = createFileRoute('/programme')({
  component: ProgrammePage,
})

const moduleLinks = {
  m1: 'https://drive.google.com/drive/folders/1gRgNRyHZRXp5jxlTVnIBp2eyDo6VhvDY?usp=drive_link',
  m2: 'https://drive.google.com/drive/folders/18VhAejWBMPeD9MPMkiCfJNMhCZ9gU6Uz?usp=drive_link',
  m3: 'https://drive.google.com/drive/folders/1aFtmkW1hnpCDJAsOZ0VosKFkFmodPwSj?usp=drive_link',
  m4: 'https://drive.google.com/drive/folders/1u2772YBYyFZF-IrWWtsZipnzsifGZRWs?usp=drive_link',
  m5: 'https://drive.google.com/drive/folders/1ZwVddyskpxxHAiuaZ-VQ5fYmDuc5kXUr?usp=drive_link',
  m6: 'https://drive.google.com/drive/folders/1m7mcJQRSrK5oY8PI5pxYbYdSlRWRK8cb?usp=drive_link',
  m7: 'https://drive.google.com/drive/folders/124KNvN8swnLbOAMWJ8fervc7JPTvT16_?usp=drive_link',
  m8: 'https://drive.google.com/drive/folders/1wOF3LAiCoyTJRE57avQ2jR7T0D7V90om?usp=drive_link',
  m9: 'https://drive.google.com/drive/folders/1qsqS3JnG1UEFKeSC0HyYx18371ifm2-E?usp=drive_link',
  m10: 'https://drive.google.com/drive/folders/1_CCDpl1YzPhSsev5icRDnh-5CQZ7VlHn?usp=drive_link',
  online:
    'https://drive.google.com/drive/folders/1UD85dS0aTYLbHjSPdWbhv0I8be8WZwCJ?usp=drive_link',
}

const useProgressTracker = () => {
  const STORAGE_KEY = 'course_progress'
  const TOTAL_MODULES = 11 // 10 modules + online meeting

  const [visitedModules, setVisitedModules] = useState<Record<string, boolean>>(
    {},
  )
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY)
      if (savedProgress) {
        const parsed = JSON.parse(savedProgress)
        setVisitedModules(parsed)

        const visitedCount = Object.values(parsed).filter(Boolean).length
        setProgress(Math.round((visitedCount / TOTAL_MODULES) * 100))
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }, [])

  const markModuleVisited = (moduleId: string) => {
    const updatedVisits = { ...visitedModules, [moduleId]: true }
    setVisitedModules(updatedVisits)

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedVisits))

    const visitedCount = Object.values(updatedVisits).filter(Boolean).length
    setProgress(Math.round((visitedCount / TOTAL_MODULES) * 100))
  }

  return { visitedModules, progress, markModuleVisited }
}

const LessonContent = ({
  type,
  count = 1,
  details,
}: {
  type: 'video' | 'docx' | 'pdf' | 'folder' | 'meeting' | 'audio'
  count?: number
  details?: string
}) => {
  const { language } = useSettingsStore()

  const icons = {
    video: <Video className="inline-block mr-1 h-4 w-4 text-blue-500" />,
    docx: <FileText className="inline-block mr-1 h-4 w-4 text-sky-600" />,
    pdf: <File className="inline-block mr-1 h-4 w-4 text-red-500" />,
    folder: <Folder className="inline-block mr-1 h-4 w-4 text-yellow-500" />,
    meeting: <Users className="inline-block mr-1 h-4 w-4 text-purple-500" />,
    audio: <Mic2 className="inline-block mr-1 h-4 w-4 text-green-500" />,
  }

  const text = {
    ru: {
      video: 'видео',
      docx: 'DOCX',
      pdf: 'PDF',
      folder: 'папка',
      meeting: 'Онлайн встреча',
      audio: 'аудио',
    },
    en: {
      video: 'video',
      docx: 'DOCX',
      pdf: 'PDF',
      folder: 'folder',
      meeting: 'Online meeting',
      audio: 'audio',
    },
  }

  return (
    <span className="text-xs text-muted-foreground ml-2">
      ({icons[type]} {count > 1 ? `${count} ` : ''}
      {text[language][type]}
      {details ? ` ${details}` : ''})
    </span>
  )
}

const ProgressGauge = ({ progress }: { progress: number }) => {
  const { language } = useSettingsStore()

  const t = {
    ru: {
      progress: 'Ваш прогресс',
    },
    en: {
      progress: 'Your progress',
    },
  }

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium">{t[language].progress}</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
        <div
          className="bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  )
}

const ModuleLink = ({
  url,
  isVisited,
  onVisit,
}: {
  moduleId: string
  url: string
  isVisited: boolean
  onVisit: () => void
}) => {
  const { language } = useSettingsStore()

  const t = {
    ru: {
      openMaterials: 'Открыть материалы',
    },
    en: {
      openMaterials: 'Open materials',
    },
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`mt-2 ${isVisited ? 'bg-green-50 border-green-300 dark:bg-green-900/20' : ''}`}
      onClick={() => {
        window.open(url, '_blank')
        onVisit()
      }}
    >
      <ExternalLink className="mr-1 h-3.5 w-3.5" />
      {t[language].openMaterials}
      {isVisited && (
        <span className="ml-2 text-xs text-green-600 dark:text-green-400">
          ✓
        </span>
      )}
    </Button>
  )
}

function ProgrammePage() {
  const { visitedModules, progress, markModuleVisited } = useProgressTracker()
  const { language } = useSettingsStore()

  const translations = {
    ru: {
      title: 'Программа курса',
      onlineMeeting: 'Онлайн встреча',
      materials: 'Материалы встречи',
      module: 'Модуль',
      modules: {
        1: 'Введение в ИИ',
        2: 'Персонализированная обучения с использованием ИИ',
        3: 'Применение ИИ и нейросетей для оценки, поддержки обучения и исследовательской работы',
        4: 'Интерактивное обучение с использованием ИИ',
        5: 'Языковые возможности нейросетей от текста к аудио',
        6: 'Нейросети для создания музыки и клонирования голоса, музыкальное сопровождение',
        7: 'Чат-боты для автоматизации и персонализации образовательного процесса',
        8: 'Анализ данных и прогнозирование с помощью ИИ',
        9: 'Этика и юридические аспекты',
        10: 'Международные практики использования ИИ в образовательном процессе',
      },
    },
    en: {
      title: 'Course Program',
      onlineMeeting: 'Online meeting',
      materials: 'Meeting materials',
      module: 'Module',
      modules: {
        1: 'Introduction to AI',
        2: 'Personalized learning using AI',
        3: 'Application of AI and neural networks for assessment, learning support and research',
        4: 'Interactive learning using AI',
        5: 'Language capabilities of neural networks from text to audio',
        6: 'Neural networks for creating music and voice cloning, musical accompaniment',
        7: 'Chatbots for automation and personalization of the educational process',
        8: 'Data analysis and forecasting using AI',
        9: 'Ethics and legal aspects',
        10: 'International practices for using AI in the educational process',
      },
    },
  }

  const t = translations[language]

  return (
    <div className="container mx-auto p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-semibold tracking-tight">
            {t.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ProgressGauge progress={progress} />

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="item-meeting">
              <AccordionTrigger>
                {t.onlineMeeting}
                {visitedModules['online'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    {t.materials} <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="online"
                      url={moduleLinks.online}
                      isVisited={!!visitedModules['online']}
                      onVisit={() => markModuleVisited('online')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-1">
              <AccordionTrigger>
                {t.module} 1: {t.modules[1]}
                {visitedModules['m1'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М1. Урок 4 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М1. Урок 3.1 <LessonContent type="video" count={5} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М1. Урок 3 <LessonContent type="video" count={4} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М1. Урок 2.1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М1. Урок 2 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М1. Урок 1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m1"
                      url={moduleLinks.m1}
                      isVisited={!!visitedModules['m1']}
                      onVisit={() => markModuleVisited('m1')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                {t.module} 2: {t.modules[2]}
                {visitedModules['m2'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М2. Урок 3 <LessonContent type="video" count={2} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М2. Урок 2.4 <LessonContent type="video" count={2} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М2. Урок 2.3 <LessonContent type="video" count={3} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М2. Урок 2.2 <LessonContent type="video" count={4} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М2. Урок 2.1 <LessonContent type="video" count={2} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М2. Урок 2{' '}
                    <LessonContent type="docx" details="только docx" />
                  </li>
                  <li>
                    М2. Урок 1 <LessonContent type="video" count={2} />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m2"
                      url={moduleLinks.m2}
                      isVisited={!!visitedModules['m2']}
                      onVisit={() => markModuleVisited('m2')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                {t.module} 3: {t.modules[3]}
                {visitedModules['m3'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М3. Урок 3 <LessonContent type="video" count={4} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М3. Урок 2 <LessonContent type="video" count={4} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М3. Урок 1.1 <LessonContent type="video" count={4} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М3. Урок 1 <LessonContent type="video" count={2} />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m3"
                      url={moduleLinks.m3}
                      isVisited={!!visitedModules['m3']}
                      onVisit={() => markModuleVisited('m3')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>
                {t.module} 4: {t.modules[4]}
                {visitedModules['m4'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М4. Урок 5 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М4. Урок 4 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М4. Урок 3 <LessonContent type="docx" />
                    <LessonContent type="folder" details="примеры (15 видео)" />
                  </li>
                  <li>
                    М4. Урок 2 <LessonContent type="video" count={2} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М4. Урок 1.3 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М4. Урок 1.2 <LessonContent type="video" count={3} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М4. Урок 1.1 <LessonContent type="video" count={3} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М4. Урок 1 <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m4"
                      url={moduleLinks.m4}
                      isVisited={!!visitedModules['m4']}
                      onVisit={() => markModuleVisited('m4')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                {t.module} 5: {t.modules[5]}
                {visitedModules['m5'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М5. Урок 1.1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М5. Урок 1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m5"
                      url={moduleLinks.m5}
                      isVisited={!!visitedModules['m5']}
                      onVisit={() => markModuleVisited('m5')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>
                {t.module} 6: {t.modules[6]}
                {visitedModules['m6'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М6. Урок 3 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М6. Урок 2 <LessonContent type="video" count={4} />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М6. Урок 1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m6"
                      url={moduleLinks.m6}
                      isVisited={!!visitedModules['m6']}
                      onVisit={() => markModuleVisited('m6')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger>
                {t.module} 7: {t.modules[7]}
                {visitedModules['m7'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М7. Урок 4 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М7. Урок 3 <LessonContent type="docx" />
                  </li>
                  <li>
                    М7. Урок 2 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М7. Урок 1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m7"
                      url={moduleLinks.m7}
                      isVisited={!!visitedModules['m7']}
                      onVisit={() => markModuleVisited('m7')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-8">
              <AccordionTrigger>
                {t.module} 8: {t.modules[8]}
                {visitedModules['m8'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М8. Урок 2.1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М8. Урок 2 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <li>
                    М8. Урок 1 <LessonContent type="video" />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m8"
                      url={moduleLinks.m8}
                      isVisited={!!visitedModules['m8']}
                      onVisit={() => markModuleVisited('m8')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-9">
              <AccordionTrigger>
                {t.module} 9: {t.modules[9]}
                {visitedModules['m9'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М9. Урок 2 <LessonContent type="docx" />
                  </li>
                  <li>
                    М9. Урок 1 <LessonContent type="pdf" />
                    <LessonContent type="docx" />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m9"
                      url={moduleLinks.m9}
                      isVisited={!!visitedModules['m9']}
                      onVisit={() => markModuleVisited('m9')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-10">
              <AccordionTrigger>
                {t.module} 10: {t.modules[10]}
                {visitedModules['m10'] && (
                  <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                    ✓
                  </span>
                )}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-6 space-y-1">
                  <li>
                    М10. Материалы <LessonContent type="docx" />
                    <LessonContent
                      type="folder"
                      details="1-3 веб-сессии (6 PDF)"
                    />
                    <LessonContent
                      type="folder"
                      details="4-7 веб-сессии (8 PDF)"
                    />
                    <LessonContent
                      type="folder"
                      details="8-11 веб-сессии (6 PDF)"
                    />
                  </li>
                  <div className="mt-2">
                    <ModuleLink
                      moduleId="m10"
                      url={moduleLinks.m10}
                      isVisited={!!visitedModules['m10']}
                      onVisit={() => markModuleVisited('m10')}
                    />
                  </div>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  )
}
