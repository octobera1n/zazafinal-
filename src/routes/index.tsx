import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSettingsStore } from '@/store/settings'

export const Route = createFileRoute('/')({
  component: EducationCoursePage,
})

function EducationCoursePage() {
  const { language } = useSettingsStore()

  const translations = {
    ru: {
      title: 'Профессиональный курс по применению ИИ в образовании',
      subtitle:
        'Станьте экспертом в интеграции искусственного интеллекта в учебный процесс.',
      advantages: 'Преимущества курса',
      advantages_items: [
        {
          title: 'Практические навыки',
          description:
            'Получите реальный опыт использования ИИ-инструментов для преподавателей и студентов.',
        },
        {
          title: 'Актуальные знания',
          description:
            'Изучите последние тенденции и лучшие практики применения ИИ в сфере образования.',
        },
        {
          title: 'Сертификат',
          description:
            'Подтвердите свою квалификацию официальным документом по окончании курса.',
        },
      ],
      program: {
        title: 'Программа курса',
        subtitle: 'Подробное описание модулей и тем.',
        modules: [
          'Модуль 1: Введение в ИИ и его роль в образовании',
          'Модуль 2: ИИ-инструменты для автоматизации рутины',
          'Модуль 3: Персонализация обучения с помощью ИИ',
          'Модуль 4: Этические аспекты использования ИИ',
          '...и многое другое',
        ],
      },
      teachers: {
        title: 'Преподаватели',
        subtitle: 'Наши эксперты в области ИИ и образования.',
        description:
          'Информация о ведущих специалистах, которые будут вести курс.',
      },
      cta: {
        title: 'Готовы начать?',
        subtitle:
          'Запишитесь на курс прямо сейчас и начните трансформацию вашего подхода к обучению!',
        button: 'Записаться на курс',
      },
    },
    en: {
      title: 'Professional Course on AI Application in Education',
      subtitle:
        'Become an expert in integrating artificial intelligence into the learning process.',
      advantages: 'Course Benefits',
      advantages_items: [
        {
          title: 'Practical Skills',
          description:
            'Get real experience using AI tools for teachers and students.',
        },
        {
          title: 'Relevant Knowledge',
          description:
            'Study the latest trends and best practices in AI application in education.',
        },
        {
          title: 'Certificate',
          description:
            'Confirm your qualification with an official document upon course completion.',
        },
      ],
      program: {
        title: 'Course Program',
        subtitle: 'Detailed description of modules and topics.',
        modules: [
          'Module 1: Introduction to AI and its role in education',
          'Module 2: AI tools for automating routine tasks',
          'Module 3: Personalization of learning with AI',
          'Module 4: Ethical aspects of AI use',
          '...and much more',
        ],
      },
      teachers: {
        title: 'Teachers',
        subtitle: 'Our experts in AI and education.',
        description:
          'Information about the leading specialists who will conduct the course.',
      },
      cta: {
        title: 'Ready to start?',
        subtitle:
          'Sign up for the course right now and begin transforming your approach to teaching!',
        button: 'Sign up for the course',
      },
    },
  }
  const t = translations[language]

  return (
    <div className="container mx-auto p-4 md:p-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight lg:text-5xl mb-4">
          {t.title}
        </h1>
        <p className="text-xl text-muted-foreground">{t.subtitle}</p>
      </header>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold tracking-tight text-center mb-8">
          {t.advantages}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {t.advantages_items.map((item, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t.program.title}</CardTitle>
            <CardDescription>{t.program.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-6 space-y-2">
              {t.program.modules.map((module, index) => (
                <li key={index}>{module}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>

      <section className="mb-12">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">{t.teachers.title}</CardTitle>
            <CardDescription>{t.teachers.subtitle}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>{t.teachers.description}</p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center">
        <h2 className="text-3xl font-semibold tracking-tight mb-4">
          {t.cta.title}
        </h2>
        <p className="text-lg text-muted-foreground mb-6">{t.cta.subtitle}</p>
        <Button size="lg">{t.cta.button}</Button>
      </section>
    </div>
  )
}
