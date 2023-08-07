import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeORMTestConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '1234',
  database: 'test_database',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,
  logging: true,
  autoLoadEntities: true,
  dropSchema: true,
};
