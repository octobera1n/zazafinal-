import { createFileRoute } from '@tanstack/react-router'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useSettingsStore } from '@/store/settings'

export const Route = createFileRoute('/teachers')({
  component: TeachersPage,
})

function TeachersPage() {
  const { language } = useSettingsStore()

  const translations = {
    ru: {
      title: 'Наши преподаватели',
      subtitle:
        'Команда опытных специалистов в области искусственного интеллекта и образования',
      teachers: [
        {
          id: 1,
          name: 'Преподаватель 1',
          image: '/images/teacher1.jpg',
          description:
            'Доктор педагогических наук, специалист в области цифровых образовательных технологий. Автор более 50 научных публикаций по применению ИИ в образовании.',
        },
        {
          id: 2,
          name: 'Преподаватель 2',
          image: '/images/teacher2.jpg',
          description:
            'Эксперт в области машинного обучения, руководитель образовательных проектов в крупной IT-компании. Разработчик адаптивных обучающих систем.',
        },
        {
          id: 3,
          name: 'Преподаватель 3',
          image: '/images/teacher3.jpg',
          description:
            'Специалист по обработке естественного языка, создатель платформы для автоматической проверки эссе и письменных работ студентов.',
        },
      ],
    },
    en: {
      title: 'Our Teachers',
      subtitle:
        'A team of experienced specialists in artificial intelligence and education',
      teachers: [
        {
          id: 1,
          name: 'Teacher 1',
          image: '/images/teacher1.jpg',
          description:
            'Doctor of Pedagogical Sciences, specialist in digital educational technologies. Author of more than 50 scientific publications on the use of AI in education.',
        },
        {
          id: 2,
          name: 'Teacher 2',
          image: '/images/teacher2.jpg',
          description:
            'Expert in machine learning, leader of educational projects in a major IT company. Developer of adaptive learning systems.',
        },
        {
          id: 3,
          name: 'Teacher 3',
          image: '/images/teacher3.jpg',
          description:
            'Natural language processing specialist, creator of a platform for automatic checking of essays and written student work.',
        },
      ],
    },
  }

  const t = translations[language]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {t.teachers.map((teacher) => (
          <Card
            key={teacher.id}
            className="overflow-hidden hover:shadow-lg transition-all duration-300 border-2 border-transparent hover:border-primary"
          >
            <div className="aspect-[4/3] relative overflow-hidden">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {teacher.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base leading-relaxed">
                {teacher.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
