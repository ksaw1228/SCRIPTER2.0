import { Test, TestingModule } from '@nestjs/testing';
import { SubtitleService } from './subtitle.service';

import { TypeOrmModule, getRepositoryToken } from '@nestjs/typeorm';

import { SubtitleRepository } from './repository/subtitle.repository';
import { EnglishSubtitleRepository } from './repository/englishsubtitle.repository';
import { KoreanSubtitleRepository } from './repository/koreansubtitle.repository';
import { TypingProgressRepository } from './repository/typingProgress.repository';

import { User } from '../auth/user.entity';
import { typeORMTestConfig } from '../configs/typeormTest.config';

describe('SubtitleService', () => {
  let subtitleService: SubtitleService;

  const userRepositoryMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(typeORMTestConfig)],
      providers: [
        SubtitleService,
        SubtitleRepository,
        EnglishSubtitleRepository,
        KoreanSubtitleRepository,
        TypingProgressRepository,
        {
          provide: getRepositoryToken(User),
          useValue: userRepositoryMock,
        },
      ],
    }).compile();

    subtitleService = module.get<SubtitleService>(SubtitleService);
  });

  it('should be defined', () => {
    expect(subtitleService).toBeDefined();
  });

  it('정의되어야함', () => {
    expect(subtitleService.createSubtitle).toBeDefined();
  });
});
