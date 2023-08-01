import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 크기 제한을 변경한 JSON 파서를 추가합니다.
  app.use(bodyParser.json({ limit: '1mb' }));

  // 크기 제한을 변경한 URL-encoded 파서를 추가합니다.
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
  await app.listen(3000);
}
bootstrap();
