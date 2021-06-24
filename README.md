#  Test: Url shortener

Необходимо написать сервис сокращения ссылок.

#### Требования:

- [X] Общение с сервисом должно проходить через интерфейс HTTP;
- [X] Сокращённую ссылку хранить в базе;
- [X] Методы сервиса должны быть идемпотентны, то есть для одной и той же ссылки не может прийти два разных сокращённых варианта;
- [X] При переходе по сокращённой ссылке делать редирект, если сокращённый вариант ссылки не найден у нас в базе, то возвращать 404 ошибку;
- [X] Сохранять количество переходов по сокращённой ссылке.

#### Технические требования:

- [X] node.js >= 12;
- [X] TypeScript;
- [X] Можно использовать любой фреймворк на выбор – fastify, express, Inversify, <b>NestJS</b>;
- [X] БД – любая, предпочтительно Postgres;
- [X] Написать юнит тесты;
- [X] Обернуть сервис в docker, чтобы запускался в docker-compose;
- [X] (Опционально) написать E2E тесты;
- [X] (Опционально) добавить кэширование(in-memory/<b>redis</b> – любое на выбор);

Оформленный код выложить на github. Написать readme для запуска сервиса и теста/тестов.

------

### Запуск приложения
Переименовать **.envexample** в **.env**

**Dev:**
```
npm run up:dev

yarn up:dev
```

**Prod:**
```
npm run up:prod

yarn up:prod
```

**Tests:**
```
npm install
npm run test

yarn install
yarn test
```

**E2E tests:**
```
npm install
npm run test:e2e

yarn install
yarn test:e2e
```
