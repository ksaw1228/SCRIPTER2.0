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
    return await this.save(typingProgress);
  }
  //타이핑 저장상황 불러오기
  async getTypingProgress(id: number) {
    return await this.findOne({ where: { subtitle: { id } } });
  }
  //타이핑 저장상황 업데이트
  async updateTypingProgress(id: number, typingSaveDto: TypingSaveDto) {
    const { progress, typedWords } = typingSaveDto;
    const typingProgress = await this.findOne({ where: { subtitle: { id } } });
    if (typingProgress) {
      // Update the progress of the found englishsubtitle
      typingProgress.progress = progress;
      typingProgress.typedWords = typedWords;

      // Save the updated englishsubtitle
      return await this.save(typingProgress);
    } else {
      console.log(`No englishsubtitle found with subtitle ID: ${id}`);
    }
  }
}
