import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMTestConfig } from '../src/configs/typeormTest.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwt: string;

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

    it('/auth/signup @Post (회원가입)', () => {
      return request(app.getHttpServer())
        .post('/auth/signup')
        .send({
          username: 'testing',
          password: 'testing',
        })
        .expect(201);
    });

    it('/auth/signin @Post (회원가입후 로그인)', () => {
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
          jwt = responseBody.accessToken;
        });
    });
  });

  describe('/boards (게시판)', () => {
    it('/boards @Get(토큰이 없는 경우 401)', () => {
      return request(app.getHttpServer()).get('/boards').expect(401);
    });

    it('/boards @Post(게시물 작성)', () => {
      return request(app.getHttpServer())
        .post('/boards')
        .set('Authorization', `Bearer ${jwt}`)
        .send({
          title: 'test title',
          description: 'test decriptrion',
        })
        .expect(201);
    });

    it('/boards @Get(모든 게시물 조회)', () => {
      return request(app.getHttpServer())
        .get('/boards')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)
        .expect((res) => {
          const responseBody = res.body;
          expect(responseBody.length).toBe(1);
          expect(responseBody[0]).toEqual({
            id: 1,
            title: 'test title',
            description: 'test decriptrion',
            status: 'PUBLIC',
          });
        });
    });

    it('/boards/:id @Get(특정 게시물 조회)', () => {
      return request(app.getHttpServer())
        .get('/boards/1')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)
        .expect((res) => {
          const responseBody = res.body;
          expect(responseBody).toEqual({
            id: 1,
            title: 'test title',
            description: 'test decriptrion',
            status: 'PUBLIC',
          });
        });
    });

    describe('/boards/:id (DELETE 게시물)', () => {
      it('게시물 삭제 성공', () => {
        return request(app.getHttpServer())
          .delete(`/boards/1`)
          .set('Authorization', `Bearer ${jwt}`) // 인증 토큰을 포함한 요청
          .expect(200);
      });

      it('게시물 삭제 권한 에러', () => {
        const unauthorizedJwt = jwt + 'hacked';
        return request(app.getHttpServer())
          .delete(`/boards/1`)
          .set('Authorization', `Bearer ${unauthorizedJwt}`) // 무단 사용자의 인증 토큰을 포함한 요청
          .expect(401);
      });
    });
  });
});
