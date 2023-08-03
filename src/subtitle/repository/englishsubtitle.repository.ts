import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EnglishSubtitle } from '../entities/englishsubtitle.entity';
import { SubtitleDto } from '../dto/create-subtitle.dto';
import { Subtitle } from '../entities/subtitle.entity';

@Injectable()
export class EnglishSubtitleRepository extends Repository<EnglishSubtitle> {
  constructor(private dataSource: DataSource) {
    super(EnglishSubtitle, dataSource.createEntityManager());
  }
  async createEnglishSubtitle(subtitleDto: SubtitleDto, subtitle: Subtitle) {
    const { content } = subtitleDto;
    const englishsubtitle = this.create({
      content,
      progress: 0,
      subtitle,
    });
    return await this.save(englishsubtitle);
  }
}
