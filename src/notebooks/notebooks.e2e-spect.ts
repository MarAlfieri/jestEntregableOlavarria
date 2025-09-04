import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../app.module';

describe('NotebooksController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/notebooks (POST)', () => {
    return request(app.getHttpServer())
      .post('/notebooks')
      .send({ title: 'Test', content: 'Content' })
      .expect(201)
      .expect(res => {
        expect(res.body.title).toBe('Test');
      });
  });

  it('/notebooks (GET)', () => {
    return request(app.getHttpServer())
      .get('/notebooks')
      .expect(200);
  });
});