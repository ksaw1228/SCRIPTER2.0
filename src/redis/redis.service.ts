import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class RedisCacheService {
  constructor(@Inject('CACHE_MANAGER') private cacheManager) {}

  //자막id 작성자id 캐싱
  async setSubtitleAuthor(subtitleId: number, authorId: number): Promise<void> {
    await this.cacheManager.set(subtitleId, authorId);
  }

  //자막id로 작성자id 리턴
  async getAuthorBySubtitle(subtitleId: string): Promise<string | undefined> {
    return await this.cacheManager.get(subtitleId);
  }
}
