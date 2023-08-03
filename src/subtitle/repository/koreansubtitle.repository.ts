import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { KoreanSubtitle } from '../entities/koreansubtitle.entity';
import { SubtitleDto } from '../dto/create-subtitle.dto';
import { Subtitle } from '../entities/subtitle.entity';

@Injectable()
export class KoreanSubtitleRepository extends Repository<KoreanSubtitle> {
  constructor(private dataSource: DataSource) {
    super(KoreanSubtitle, dataSource.createEntityManager());
  }
  async createKoreanSubtitle(subtitleDto: SubtitleDto, subtitle: Subtitle) {
    const { content } = subtitleDto;
    const koreansubtitle = this.create({
      content,
      progress: 0,
      subtitle,
    });
    return await this.save(koreansubtitle);
  }
}
