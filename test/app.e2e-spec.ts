import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeORMTestConfig } from '../src/configs/typeormTest.config';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let jwt: string;
  let unauthorizedJwt: string;

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

    describe('2번유저 생성로직', () => {
      it('/auth/signup @Post (회원가입)', () => {
        return request(app.getHttpServer()).post('/auth/signup').send({
          username: 'testing2',
          password: 'testing2',
        });
      });

      it('/auth/signin @Post (회원가입후 로그인)', () => {
        return request(app.getHttpServer())
          .post('/auth/signin')
          .send({
            username: 'testing2',
            password: 'testing2',
          })
          .expect(200)
          .expect((res) => {
            const responseBody = res.body;
            unauthorizedJwt = responseBody.accessToken;
          });
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
    describe('/boards/:id @Get(특정 게시물 조회)', () => {
      it('게시물 조회 성공', () => {
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

      it('/존재하지 않는 게시물 요청 에러', () => {
        return request(app.getHttpServer())
          .get('/boards/2')
          .set('Authorization', `Bearer ${jwt}`)
          .expect(404);
      });
    });

    describe('/boards/:id @Delete(특정 게시물 삭제)', () => {
      it('게시물 삭제 권한 에러', () => {
        return request(app.getHttpServer())
          .delete(`/boards/1`)
          .set('Authorization', `Bearer ${unauthorizedJwt}`) // 무단 사용자의 인증 토큰을 포함한 요청
          .expect(403);
      });

      it('존재하지 않는 게시물 삭제 요청 에러', () => {
        return request(app.getHttpServer())
          .delete(`/boards/999`)
          .set('Authorization', `Bearer ${jwt}`) // 인증 토큰을 포함한 요청
          .expect(404);
      });

      it('게시물 삭제 성공', () => {
        return request(app.getHttpServer())
          .delete(`/boards/1`)
          .set('Authorization', `Bearer ${jwt}`) // 인증 토큰을 포함한 요청
          .expect(200);
      });
    });
  });

  describe('/subtitle (자막 게시판)', () => {
    it('/subtitle @Get(토큰이 없는 경우 401)', () => {
      return request(app.getHttpServer()).get('/subtitle').expect(401);
    });

    it('/subtitle @Post(한/영 자막 업로드)', async () => {
      const response = await request(app.getHttpServer())
        .post('/subtitle')
        .set('Authorization', `Bearer ${jwt}`)
        .send({
          title: 'subtitle Test',
          koreanSubtitle: { content: '안녕하세요' },
          englishSubtitle: { content: 'Hello' },
        });
      expect(response.status).toBe(201);
    });

    it('/subtitle @Get(내가 업드한 모든 자막 목록 요청)', () => {
      return request(app.getHttpServer())
        .get('/subtitle')
        .set('Authorization', `Bearer ${jwt}`)
        .expect(200)
        .expect((res) => {
          const responseBody = res.body;
          expect(responseBody.length).toBe(1);
          expect(responseBody[0]).toEqual({
            id: 1,
            title: 'subtitle Test',
          });
        });
    });

    describe('/subtitle/:id/script (특정 자막의 스크립트용 데이터 관련)', () => {
      it('@Get(작성자id와 요청자 id가 다를 경우 권한 에러', () => {
        return request(app.getHttpServer())
          .get('/subtitle/1/script')
          .set('Authorization', `Bearer ${unauthorizedJwt}`) // 무단 사용자의 인증 토큰을 포함한 요청
          .expect(403);
      });

      it('@Patch(스크립트 읽던 위치(스크롤 위치) 저장)', () => {
        return request(app.getHttpServer())
          .patch('/subtitle/1/script')
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            enSubtitleProgress: 50,
            koSubtitleProgress: 100,
          })
          .expect(200);
      });

      it('@Get(작성자id 확인 후 데이터 응답 성공)', () => {
        return request(app.getHttpServer())
          .get('/subtitle/1/script')
          .set('Authorization', `Bearer ${jwt}`)
          .expect(200)
          .expect((res) => {
            const responseBody = res.body;
            expect(responseBody).toEqual({
              englishSubtitle: {
                id: 1,
                content: 'Hello',
                progress: '50',
              },
              koreanSubtitle: {
                id: 1,
                content: '안녕하세요',
                progress: '100',
              },
            });
          });
      });
    });

    describe('/subtitle/:id/typing (특정 자막의 타이핑용 데이터 관련)', () => {
      it('@Get(작성자id와 요청자 id가 다를 경우 권한 에러', () => {
        return request(app.getHttpServer())
          .get('/subtitle/1/typing')
          .set('Authorization', `Bearer ${unauthorizedJwt}`) // 무단 사용자의 인증 토큰을 포함한 요청
          .expect(403);
      });

      it('@Patch(작성한 타이핑 저장)', () => {
        return request(app.getHttpServer())
          .patch('/subtitle/1/typing')
          .set('Authorization', `Bearer ${jwt}`)
          .send({
            progress: 4,
            typedWords: JSON.stringify(['a', 'b', 'c', 'd']),
          })
          .expect(200);
      });

      it('@Get(작성자id 확인 후 데이터 응답 성공)', () => {
        return request(app.getHttpServer())
          .get('/subtitle/1/typing')
          .set('Authorization', `Bearer ${jwt}`)
          .expect(200)
          .expect((res) => {
            const responseBody = res.body;
            expect(responseBody).toEqual({
              englishSubtitle: {
                content: 'Hello',
                id: 1,
                progress: '50',
              },
              koreanSubtitle: {
                content: '안녕하세요',
                id: 1,
                progress: '100',
              },
              typingProgress: {
                id: 1,
                progress: '4',
                typedWords: '["a","b","c","d"]',
              },
            });
          });
      });

      describe('/subtitle/:id @Delete(특정 게시물 삭제)', () => {
        it('게시물 삭제 권한 에러', () => {
          return request(app.getHttpServer())
            .delete(`/subtitle/1`)
            .set('Authorization', `Bearer ${unauthorizedJwt}`) // 무단 사용자의 인증 토큰을 포함한 요청
            .expect(403);
        });

        it('존재하지 않는 게시물 삭제 요청 에러', () => {
          return request(app.getHttpServer())
            .delete(`/subtitle/999`)
            .set('Authorization', `Bearer ${jwt}`) // 인증 토큰을 포함한 요청
            .expect(404);
        });

        it('게시물 삭제 성공', () => {
          return request(app.getHttpServer())
            .delete(`/subtitle/1`)
            .set('Authorization', `Bearer ${jwt}`) // 인증 토큰을 포함한 요청
            .expect(200);
        });
      });
    });
  });
});
