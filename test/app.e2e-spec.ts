import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';

describe('Cats', () => {
  let app: INestApplication;
  let shortLink = undefined;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it(`/Post create short link`, () => {
    return request(app.getHttpServer())
      .post('/create')
      .send({
        longLink: 'https://yandex.ru',
      })
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .expect(201)
      .then((response) => {
        shortLink = response.body.shortLink;
      });
  });

  it(`/Get redirect to link`, () => {
    return request(app.getHttpServer())
      .get(`/${shortLink}`)
      .expect(302)
      .then((response) => {
        console.assert(
          response.text,
          'Found. Redirecting to https://yandex.ru',
        );
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
