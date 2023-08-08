import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMTestConfig } from '../src/configs/typeormTest.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeORMTestConfig), AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  describe('/auth (유저인증)', () => {
    it('/auth/signin (정보가 없는 데이터로 로그인)', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          username: 'testing',
          password: 'testing',
        })
        .expect(401);
    });

    it('/auth/signup (회원가입)', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'testing',
          password: 'testing',
        })
        .expect(201);
    });

    it('/auth/signin (회원가입후 로그인)', () => {
      return request(app.getHttpServer())
        .post('/auth/signin')
        .send({
          username: 'testing',
          password: 'testing',
        })
        .expect(200)
        .expect((res) => {
          const responseBody = res.body;
          expect(responseBody).toHaveProperty('accessToken'); // accessToken 속성이 있는지 확인
          expect(typeof responseBody.accessToken).toBe('string'); // accessToken의 값이 문자열인지 확인
        });
    });
  });
});
