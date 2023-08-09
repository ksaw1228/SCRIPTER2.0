import { Test, TestingModule } from '@nestjs/testing';
import { SubtitleService } from './subtitle.service';
import { SubtitleRepository } from './repository/subtitle.repository';
import { EnglishSubtitleRepository } from './repository/englishSubtitle.repository';
import { KoreanSubtitleRepository } from './repository/koreanSubtitle.repository';
import { TypingProgressRepository } from './repository/typingProgress.repository';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { User } from '../auth/user.entity';
import { NotFoundException } from '@nestjs/common';

describe('SubtitleService', () => {
  let subtitleService: SubtitleService;
  let subtitleRepositoryMock;
  let englishSubtitleRepositoryMock;
  let koreanSubtitleRepositoryMock;
  let typingProgressRepositoryMock;
  let user: User;
  let createSubtitleDto: CreateSubtitleDto;

  beforeEach(async () => {
    subtitleRepositoryMock = {
      createSubtitle: jest.fn(),
      getAllMySubtitles: jest.fn(),
      queryBuilder: jest.fn(),
      getOne: jest.fn(),
      deleteSubtitleById: jest.fn(),
    };

    englishSubtitleRepositoryMock = {
      createEnglishSubtitle: jest.fn(),
      findOneForScript: jest.fn(),
      updateProgress: jest.fn(),
    };

    koreanSubtitleRepositoryMock = {
      createKoreanSubtitle: jest.fn(),
      findOneForScript: jest.fn(),
      updateProgress: jest.fn(),
    };

    typingProgressRepositoryMock = {
      storeTypingProgress: jest.fn(),
      getTypingProgress: jest.fn(),
      updateTypingProgress: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubtitleService,
        {
          provide: SubtitleRepository,
          useValue: subtitleRepositoryMock,
        },
        {
          provide: EnglishSubtitleRepository,
          useValue: englishSubtitleRepositoryMock,
        },
        {
          provide: KoreanSubtitleRepository,
          useValue: koreanSubtitleRepositoryMock,
        },
        {
          provide: TypingProgressRepository,
          useValue: typingProgressRepositoryMock,
        },
      ],
    }).compile();

    subtitleService = module.get<SubtitleService>(SubtitleService);

    // 예제 데이터를 초기화합니다.
    user = new User();
    createSubtitleDto = {
      title: 'testSub',
      koreanSubtitle: { content: '안녕하세요' },
      englishSubtitle: { content: 'Hello' },
    };
  });

  // 각 테스트가 종료된 후 수행할 작업을 정의합니다.
  afterEach(() => {
    // 모든 jest.fn() 함수의 호출 정보를 초기화합니다.
    jest.resetAllMocks();
  });

  describe('createSubtitle', () => {
    it('입력값을 나누어 각 레파지토리의 생성 메서드에 입력값을 주고 호출', async () => {
      const savedSubtitle = { id: 1 };
      subtitleRepositoryMock.createSubtitle.mockResolvedValue(savedSubtitle);
      const result = await subtitleService.createSubtitle(
        createSubtitleDto,
        user,
      );

      expect(subtitleRepositoryMock.createSubtitle).toHaveBeenCalledWith(
        createSubtitleDto,
        user,
      );
      expect(
        englishSubtitleRepositoryMock.createEnglishSubtitle,
      ).toHaveBeenCalledWith(createSubtitleDto.englishSubtitle, savedSubtitle);
      expect(
        koreanSubtitleRepositoryMock.createKoreanSubtitle,
      ).toHaveBeenCalledWith(createSubtitleDto.koreanSubtitle, savedSubtitle);
      expect(
        typingProgressRepositoryMock.storeTypingProgress,
      ).toHaveBeenCalledWith(savedSubtitle);

      // 결과값을 검증합니다.
      expect(result).toEqual(savedSubtitle);
    });
  });

  describe('getAllMySubtitles', () => {
    it('subtitleRepository.getAllMySubtitles()을 호출하고 결과값을 반환', async () => {
      const allSubtitles = [{ id: 1 }, { id: 2 }];
      subtitleRepositoryMock.getAllMySubtitles.mockResolvedValue(allSubtitles);
      const result = await subtitleService.getAllMySubtitles(user);

      expect(subtitleRepositoryMock.getAllMySubtitles).toHaveBeenCalledWith(
        user,
      );

      expect(result).toEqual(allSubtitles);
    });
  });

  describe('getAuthorId', () => {
    it('입력받은 자막id의 작성자 id 찾기', async () => {
      const subtitleId = 1;
      const userId = 2;
      const subtitle = {
        id: subtitleId,
        user: { id: userId },
      };

      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(subtitle),
      };

      subtitleRepositoryMock.createQueryBuilder = jest
        .fn()
        .mockReturnValue(queryBuilder);

      const result = await subtitleService.getAuthorId(subtitleId);

      //쿼리빌더
      expect(subtitleRepositoryMock.createQueryBuilder).toHaveBeenCalledWith(
        'subtitle',
      );
      expect(queryBuilder.leftJoinAndSelect).toHaveBeenCalledWith(
        'subtitle.user',
        'user',
      );
      expect(queryBuilder.where).toHaveBeenCalledWith('subtitle.id = :id', {
        id: subtitleId,
      });

      expect(result).toBe(userId);
    });

    it('자막이 없으면 NotFoundException', async () => {
      const subtitleId = 1;

      const queryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      };

      subtitleRepositoryMock.createQueryBuilder = jest
        .fn()
        .mockReturnValue(queryBuilder);

      await expect(subtitleService.getAuthorId(subtitleId)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('deleteSubtitle', () => {
    it('subtitleRepository.deleteSubtitleById()호출하고 결과 반환', async () => {
      const subtitleId = 1;
      const deletedSubtitle = { id: subtitleId };
      subtitleRepositoryMock.deleteSubtitleById.mockResolvedValue(
        deletedSubtitle,
      );
      const result = await subtitleService.deleteSubtitleById(subtitleId);

      expect(subtitleRepositoryMock.deleteSubtitleById).toHaveBeenCalledWith(
        subtitleId,
      );

      expect(result).toEqual(deletedSubtitle);
    });
  });
});
