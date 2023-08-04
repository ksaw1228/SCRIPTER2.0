import { Injectable, NotFoundException } from '@nestjs/common';
import { SubtitleRepository } from './repository/subtitle.repository';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { User } from 'src/auth/user.entity';
import { EnglishSubtitleRepository } from './repository/englishSubtitle.repository';
import { KoreanSubtitleRepository } from './repository/koreanSubtitle.repository';
import { TypingProgressRepository } from './repository/typingProgress.repository';
import { ScriptSaveDto } from './dto/script-save.dto';
import { TypingSaveDto } from './dto/typing-save.dto';

@Injectable()
export class SubtitleService {
  constructor(
    private subtitleRepository: SubtitleRepository,
    private englishsubtitlerepository: EnglishSubtitleRepository,
    private koreansubtitlerepository: KoreanSubtitleRepository,
    private typingprogressrepository: TypingProgressRepository,
  ) {}

  //자막 업로드
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

  getAllMySubtitles(user: User) {
    return this.subtitleRepository.getAllMySubtitles(user);
  }

  //작성자 열람자 조회
  async getAuthorId(subtitleId: number) {
    const subtitle = await this.subtitleRepository
      .createQueryBuilder('subtitle')
      .leftJoinAndSelect('subtitle.user', 'user')
      .where('subtitle.id = :id', { id: subtitleId })
      .getOne();
    if (!subtitle) {
      throw new NotFoundException(`can't find ${subtitleId}`);
    }
    return subtitle.user.id;
  }

  async findOneForScript(id: number) {
    // eslint-disable-next-line prettier/prettier
    const englishSubtitle = await this.englishsubtitlerepository.findOneForScript(id);
    // eslint-disable-next-line prettier/prettier
    const koreanSubtitle = await this.koreansubtitlerepository.findOneForScript(id);
    return {
      englishSubtitle,
      koreanSubtitle,
    };
  }

  async findOneForTyping(id: number) {
    const englishSubtitle =
      await this.englishsubtitlerepository.findOneForScript(id);
    const koreanSubtitle = await this.koreansubtitlerepository.findOneForScript(
      id,
    );
    const typingProgress =
      await this.typingprogressrepository.getTypingProgress(id);
    return {
      englishSubtitle,
      koreanSubtitle,
      typingProgress,
    };
  }

  updateScriptProgress(id: number, scriptSave: ScriptSaveDto) {
    const { enSubtitleProgress, koSubtitleProgress } = scriptSave;
    this.englishsubtitlerepository.updateProgress(id, enSubtitleProgress);
    this.koreansubtitlerepository.updateProgress(id, koSubtitleProgress);
  }

  updateTypingProgress(id: number, typingSave: TypingSaveDto) {
    this.typingprogressrepository.updateTypingProgress(id, typingSave);
  }

  deletSubtitleById(id: number) {
    return this.subtitleRepository.deletSubtitleById(id);
  }
}
