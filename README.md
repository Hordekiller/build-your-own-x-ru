# Build Your Own X — Русский каталог

[![Живой сайт](https://img.shields.io/badge/🌐%20Сайт%20—%20русский%20каталог-hordekiller.github.io/build-your-own-x-ru-blue?logo=githubpages&logoColor=white)](https://hordekiller.github.io/build-your-own-x-ru/)
[![Английская версия](https://img.shields.io/badge/🌍%20English%20version-hordekiller.github.io/build-your-own-x-en-orange)](https://hordekiller.github.io/build-your-own-x-en/)
[![Персидская версия](https://img.shields.io/badge/🇮🇷%20Persian%20version-hordekiller.github.io/build-your-own-x-green)](https://hordekiller.github.io/build-your-own-x/)
[![Лицензия](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/Hordekiller/build-your-own-x/blob/main/LICENSE)

> Что я не могу создать, я не понимаю — Ричард Фейнман

Подборка из **359 пошаговых руководств** на русском языке для воссоздания
ваших любимых технологий с нуля — компиляторы, операционные системы,
игровые движки, базы данных, нейросети, рендереры и многое другое.

Это русскоязычная версия английского каталога
[build-your-own-x-en](https://github.com/Hordekiller/build-your-own-x-en),
который, в свою очередь, является развитием знаменитого списка
[`build-your-own-x`](https://github.com/codecrafters-io/build-your-own-x).
Для каждого руководства создана отдельная посадочная страница с кратким
содержанием, целями обучения, основной идеей и ссылками на первоисточник.

---

## Живой сайт

- **Русский:** <https://hordekiller.github.io/build-your-own-x-ru/>
- **Английский:** <https://hordekiller.github.io/build-your-own-x-en/>
- **Персидский:** <https://hordekiller.github.io/build-your-own-x/>

## Возможности

- **359 страниц руководств** по 30 категориям — от
  [3D-рендереров](https://hordekiller.github.io/build-your-own-x-ru/tutorials-ru/index.html)
  и [BitTorrent-клиентов](https://hordekiller.github.io/build-your-own-x-ru/tutorials-ru/index.html)
  до языков программирования, нейросетей и ОС.
- Быстрый статический сайт без зависимостей — обычный HTML + CSS + нативный JS,
  без фреймворков и шага сборки (кроме Google Fonts).
- Поиск по мере ввода и фильтрация по категориям на главной странице.
- Отслеживание прогресса по каждой странице с прогресс-барами по категориям.
- Перекрёстная навигация: каждая страница ссылается на английскую и
  персидскую версии, когда они доступны.
- Развёртывание с помощью GitHub Actions на GitHub Pages (тип `workflow`).

## Структура репозитория

```
.
├── assets/
│   ├── css/style.css          # Общие стили
│   └── js/
│       ├── tutorials-ru.js    # Данные индекса руководств (id, категория, язык, …)
│       └── main.js            # Отрисовка, поиск, фильтры, прогресс
├── templates/
│   └── page_template_ru.html  # Шаблон посадочной страницы (использует генератор)
├── tutorials-ru/
│   └── *.html                 # 359 посадочных страниц руководств
├── ru-done.json               # Упорядоченный список id руководств (артефакт аудита)
├── ru_titles.json             # Словарь id → русский заголовок (артефакт аудита)
├── index.html                 # Главная страница каталога
└── .github/workflows/
    └── deploy-pages.yml       # Сборка и развёртывание на GitHub Pages
```

## Страницы руководств

Каждая страница (`tutorials-ru/{id}.html`) содержит:

- Бейджи языка (⚙ Язык) и категории (📁)
- Бейджи «Русская страница», «Оригинальный источник»
- Ссылки на первоисточник и на английскую/персидскую версии
- Четыре раздела: **«О чём это»**, **«Что вы узнаете»**,
  **«Основная идея»** (с фрагментами кода) и **«Почему это важно»**
- Обязательное примечание об авторских правах: руководство принадлежит
  его автору, страница — лишь перевод.

## Как создавался каталог

1. Метаданные руководств собраны в `assets/js/tutorials-ru.js`
   (359 записей: id, категория, язык, ссылка на оригинал, видео-флаг).
2. Посадочные страницы генерируются из `templates/page_template_ru.html`
   Python-генератором; результаты закоммичены в репозиторий.
3. Скрипт аудита проверяет каждую страницу на соответствие индексу —
   заголовки, бейджи, разделы, блоки кода, перекрёстные ссылки и чистоту
   ссылок (нет raw-`&`, нет битых внутренних ссылок) — с гарантированно
   чистым результатом `359/359`.

## Развёртывание

Репозиторий развёртывается сам при каждом push в `main`:

```yaml
# .github/workflows/deploy-pages.yml (сокращённо)
on: push
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v5
      - uses: actions/upload-pages-artifact@v3
        with: { path: . }
      - uses: actions/deploy-pages@v4
```

## Лицензия и благодарности

- Все руководства принадлежат их авторам — ссылку на оригинал вы найдёте
  на каждой странице.
- Структура каталога и генерация страниц наследуют
  [персидский проект BYOX](https://github.com/Hordekiller/build-your-own-x)
  и [английский каталог](https://github.com/Hordekiller/build-your-own-x-en).
- Список руководств взят из комьюнити-репозитория
  [build-your-own-x](https://github.com/codecrafters-io/build-your-own-x).
- Собственный код этого репозитория распространяется по лицензии MIT.