import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSettingsStore } from '@/store/settings'

export const Route = createFileRoute('/contact')({
  component: ContactPage,
})

function ContactPage() {
  const { language } = useSettingsStore()

  const contactInfo = {
    email: 'info@zaza.kz',
    phone: '+7 (777) 123-45-67',
    address: 'г. Атырау жк Zaman',
    workHours: 'Пн-Пт: 9:00 - 18:00',
    telegram: '@triplekillawp',
    whatsapp: '+7 (777) 7777777',
  }

  const translations = {
    ru: {
      title: 'Контакты',
      subtitle:
        'Свяжитесь с нами, если у вас есть вопросы о курсе "ИИ в образовании"',
      contactInfo: 'Контактная информация',
      contactDetails: 'Наши контактные данные',
      writeToUs: 'Напишите нам',
      formDescription: 'Заполните форму, и мы свяжемся с вами',
      name: 'Имя',
      namePlaceholder: 'Ваше имя',
      email: 'Email',
      emailPlaceholder: 'ваш@email.com',
      subject: 'Тема',
      subjectPlaceholder: 'Тема сообщения',
      message: 'Сообщение',
      messagePlaceholder: 'Ваше сообщение...',
      send: 'Отправить',
    },
    en: {
      title: 'Contact Us',
      subtitle:
        'Get in touch if you have any questions about our "AI in Education" course',
      contactInfo: 'Contact Information',
      contactDetails: 'Our contact details',
      writeToUs: 'Write to Us',
      formDescription: 'Fill out the form and we will get back to you',
      name: 'Name',
      namePlaceholder: 'Your name',
      email: 'Email',
      emailPlaceholder: 'your@email.com',
      subject: 'Subject',
      subjectPlaceholder: 'Message subject',
      message: 'Message',
      messagePlaceholder: 'Your message...',
      send: 'Send',
    },
  }

  const t = translations[language]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4">{t.title}</h1>
        <p className="text-lg text-muted-foreground">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{t.contactInfo}</CardTitle>
            <CardDescription>{t.contactDetails}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-primary mr-3" />
              <span>{contactInfo.email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-primary mr-3" />
              <span>{contactInfo.phone}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-primary mr-3" />
              <span>{contactInfo.address}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-primary mr-3" />
              <span>{contactInfo.workHours}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader>
            <CardTitle>{t.writeToUs}</CardTitle>
            <CardDescription>{t.formDescription}</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium mb-1"
                  >
                    {t.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                    placeholder={t.namePlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    {t.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                    placeholder={t.emailPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-1"
                  >
                    {t.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                    placeholder={t.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-1"
                  >
                    {t.message}
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full p-2 border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:border-gray-700"
                    placeholder={t.messagePlaceholder}
                  ></textarea>
                </div>
              </div>

              <Button type="submit" className="w-full">
                {t.send}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
