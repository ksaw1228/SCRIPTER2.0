import { Injectable } from '@nestjs/common';
import { SubtitleRepository } from './repository/subtitle.repository';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { User } from 'src/auth/user.entity';
import { EnglishSubtitleRepository } from './repository/englishSubtitle.repository';
import { KoreanSubtitleRepository } from './repository/koreanSubtitle.repository';
import { TypingProgressRepository } from './repository/typingProgress.repository';

@Injectable()
export class SubtitleService {
  constructor(
    private subtitleRepository: SubtitleRepository,
    private englishsubtitlerepository: EnglishSubtitleRepository,
    private koreansubtitlerepository: KoreanSubtitleRepository,
    private typingprogressrepository: TypingProgressRepository,
  ) {}

  async createSubtitle(createSubTitleDto: CreateSubtitleDto, user: User) {
    const { koreanSubtitle, englishSubtitle } = createSubTitleDto;

    const savedSubtitle = await this.subtitleRepository.createSubtitle(
      createSubTitleDto,
      user,
    );
    this.englishsubtitlerepository.createEnglishSubtitle(
      englishSubtitle,
      savedSubtitle,
    );
    this.koreansubtitlerepository.createKoreanSubtitle(
      koreanSubtitle,
      savedSubtitle,
    );
    //초기테이블 생성 id만 연결
    this.typingprogressrepository.storeTypingProgress(savedSubtitle);
    return savedSubtitle;
  }
}
