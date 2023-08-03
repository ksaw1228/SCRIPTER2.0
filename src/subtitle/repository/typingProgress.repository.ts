import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { TypingProgress } from '../entities/typingprogress.entity';
import { TypingSaveDto } from '../dto/typing-save.dto';
import { Subtitle } from '../entities/subtitle.entity';

@Injectable()
export class TypingProgressRepository extends Repository<TypingProgress> {
  constructor(private dataSource: DataSource) {
    super(TypingProgress, dataSource.createEntityManager());
  }
  //초기테이블 저장
  async storeTypingProgress(subtitle: Subtitle) {
    const typingProgress = this.create({
      progress: 0,
      typedWords: '',
      subtitle,
    });
    console.log(typingProgress);
    return await this.save(typingProgress);
  }
  //업데이트
  updateTypingProgress(typingSaveDto: TypingSaveDto, subtitle: Subtitle) {
    subtitle; //로 타이핑 정보 업데이트할subtitle 찾고
    const { progress, typedWords } = typingSaveDto;
    //?
    const typingProgress = this.create({
      progress,
      typedWords,
      subtitle,
    });
    return this.save(typingProgress);
  }
}
