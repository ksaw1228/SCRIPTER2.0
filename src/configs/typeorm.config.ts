import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as config from 'config';
import * as fs from 'fs';

const dbconfig = config.get('db');
require('dotenv').config();

export const typeORMConfig: TypeOrmModuleOptions = {
  type: dbconfig.type,
  host: process.env.RDS_HOSTNAME || dbconfig.host,
  port: process.env.RDS_PORT || dbconfig.port,
  username: process.env.RDS_USERNAME || dbconfig.username,
  password: process.env.RDS_PASSWORD || dbconfig.password,
  database: process.env.RDS_DB_NAME || dbconfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  // autoLoadEntities: dbconfig.synchronize,
  ssl: {
    // 다운로드한 인증서 파일 경로 추가
    ca: fs.readFileSync('global-bundle.pem'),
  },
  extra: {
    // SSL 연결을 강제 설정
    ssl: { rejectUnauthorized: false },
  },
};
