import { Module } from '@nestjs/common';
import * as redisStore from 'cache-manager-ioredis';
import * as dotenv from 'dotenv';
import { RedisCacheService } from './redis.service';

dotenv.config();

@Module({
  providers: [
    {
      provide: 'CACHE_MANAGER',
      useFactory: () =>
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('cache-manager').caching({
          store: redisStore,
          //ElastiCache 앤드포인트
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          ttl: 1000,
        }),
    },
    RedisCacheService,
  ],
  exports: ['CACHE_MANAGER', RedisCacheService],
})
export class RedisModule {}
