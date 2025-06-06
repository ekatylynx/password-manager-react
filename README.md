# Password Manager (React/TypeScript/Vite)

Password Manager — это современное веб-приложение, созданное для безопасного управления зашифрованными данными. Оно позволяет пользователям создавать и загружать защищённые файлы с помощью шифрования AES-256, обеспечивая удобный и интуитивно понятный интерфейс. Проект демонстрирует передовые практики фронтенд-разработки, включая TypeScript, React 18, Vite и модульную архитектуру и не нуждается в сервере.

## О проекте

Password Manager помогает пользователям безопасно хранить и управлять конфиденциальной информацией. Приложение предлагает два основных сценария использования:
- **Создание нового зашифрованного файла**: Пользователь задаёт пароль и скачивает пустой файл `data.aes256`, защищённый шифрованием AES-256.
- **Загрузка существующего файла**: Пользователь загружает файл `data.aes256`, вводит пароль и получает доступ к расшифрованным данным.

Процесс реализован через интерактивную пошаговую форму (Wizard), которая делает взаимодействие с приложением простым и понятным даже для новичков.

## Основные возможности

- **Безопасное шифрование**: Использует библиотеку `@vtfk/encryption` для надёжного шифрования и дешифрования данных с алгоритмом AES-256.
- **Интуитивный интерфейс**: Пошаговая форма с прогресс-баром, адаптированная для десктопов и мобильных устройств, упрощает создание и загрузку зашифрованных файлов.
- **Динамическая навигация**: Форма адаптируется к выбору пользователя (создание или загрузка файла), отображая только необходимые шаги.
- **Валидация данных**: Все шаги включают проверку ввода, чтобы предотвратить ошибки (например, пустой пароль или отсутствие файла).
- **Адаптивный дизайн**: Прогресс-бар и интерфейс автоматически подстраиваются под размер экрана, обеспечивая удобство использования на любых устройствах.
- **Тёмная тема**: Возможность переключения между светлой и тёмной темами.
- **Локальное сохранение состояния**: Использует `sessionStorage` для сохранения статуса аутентификации, улучшая пользовательский опыт.
- **В текущий момент находится в разработке**...


## Технологический стек

- **React 18**: Для построения динамического и отзывчивого интерфейса.
- **TypeScript**: Для строгой типизации и предотвращения ошибок на этапе разработки.
- **Vite**: Для быстрой сборки и оптимизации проекта.
- **SCSS**: Для модульных и адаптивных стилей.
- **@vtfk/encryption**: Для шифрования и дешифрования данных с алгоритмом AES-256.
- **React Router**: Для навигации между страницами приложения.


## Установка и запуск

### Требования
- Node.js (версия 18 или выше)
- npm (версия 8 или выше)

### Инструкции
1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/your-username/password-manager.git
   cd password-manager
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```

4. Откройте приложение в браузере по адресу `http://localhost:5173`.

5. Для сборки продакшен-версии:
   ```bash
   npm run build
   ```


## Использование

1. Откройте приложение и выберите один из вариантов:
   - **Создать новый файл**: Задайте пароль и скачайте зашифрованный файл `data.aes256`.
   - **Загрузить существующий файл**: Загрузите файл `data.aes256`, введите пароль и получите доступ к данным.
2. Следуйте инструкциям в пошаговой форме, чтобы завершить процесс.
3. После успешной аутентификации вы получите уведомление с результатами.


## Планы по развитию
- **Хранение паролей**: Добавить возможность сохранять и управлять списком паролей в зашифрованном файле.
- **Поддержка drag-and-drop**: Улучшить загрузку файлов с помощью перетаскивания.
- **Локализация**: Добавить поддержку нескольких языков для международных пользователей.
- **Юнит-тесты**: Покрыть компоненты тестами с использованием Jest и React Testing Library.


## Контакты
Если вам понравился проект или вы хотите обсудить любое сотрудничество, свяжитесь со мной:
- Email: ekate.krv@gmail.com
