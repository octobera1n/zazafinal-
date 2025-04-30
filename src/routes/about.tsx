import { createFileRoute } from '@tanstack/react-router'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useSettingsStore } from '@/store/settings'

export const Route = createFileRoute('/about')({
  component: AboutCoursePage,
})

function AboutCoursePage() {
  const { language } = useSettingsStore()

  const translations = {
    ru: {
      title: 'О нашем курсе',
      description1:
        'Наш курс "Искусственный интеллект в образовании" разработан для педагогов, методистов и всех, кто интересуется современными образовательными технологиями. Программа эффективно сочетает теоретические основы с практическим применением ИИ-инструментов непосредственно в учебном процессе.',
      description2:
        'За 12 недель интенсивного обучения вы освоите ключевые технологии искусственного интеллекта. Вы научитесь применять их для персонализации обучения, автоматизации проверки работ, глубокого анализа образовательных данных и создания передовых интеллектуальных обучающих систем.',
      whatYouWillLearn: 'Что вы узнаете:',
      topics: [
        'Основы искусственного интеллекта и машинного обучения',
        'Практическое применение ИИ для адаптивного и персонализированного обучения',
        'Современные инструменты для автоматической проверки заданий',
        'Методы анализа образовательных данных для улучшения учебных программ',
        'Важные этические аспекты и рекомендации по использованию ИИ в образовании',
      ],
    },
    en: {
      title: 'About Our Course',
      description1:
        'Our "Artificial Intelligence in Education" course is designed for teachers, methodologists, and anyone interested in modern educational technologies. The program effectively combines theoretical foundations with practical application of AI tools directly in the educational process.',
      description2:
        'Over 12 weeks of intensive training, you will master key artificial intelligence technologies. You will learn to apply them for learning personalization, automated work verification, in-depth analysis of educational data, and creation of advanced intelligent learning systems.',
      whatYouWillLearn: 'What you will learn:',
      topics: [
        'Fundamentals of artificial intelligence and machine learning',
        'Practical application of AI for adaptive and personalized learning',
        'Modern tools for automatic assessment',
        'Methods of analyzing educational data to improve curricula',
        'Important ethical aspects and recommendations for using AI in education',
      ],
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
        <CardContent className="space-y-4">
          <p className="text-lg text-muted-foreground">{t.description1}</p>
          <p className="text-lg text-muted-foreground">{t.description2}</p>
          <div>
            <h3 className="text-2xl font-semibold tracking-tight mb-3">
              {t.whatYouWillLearn}
            </h3>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              {t.topics.map((topic, index) => (
                <li key={index}>{topic}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
