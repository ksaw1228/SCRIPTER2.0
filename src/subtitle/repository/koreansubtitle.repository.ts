import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { KoreanSubtitle } from '../entities/koreansubtitle.entity';
import { SubtitleDto } from '../dto/create-subtitle.dto';
import { Subtitle } from '../entities/subtitle.entity';
import { parseSubtitle } from '../utill/subtitleParse.utill';

@Injectable()
export class KoreanSubtitleRepository extends Repository<KoreanSubtitle> {
  constructor(private dataSource: DataSource) {
    super(KoreanSubtitle, dataSource.createEntityManager());
  }
  async createKoreanSubtitle(subtitleDto: SubtitleDto, subtitle: Subtitle) {
    let { content } = subtitleDto;
    const { fileExtension } = subtitleDto;

    content = parseSubtitle(content, fileExtension);
    const koreansubtitle = this.create({
      content,
      progress: 0,
      subtitle,
    });
    return await this.save(koreansubtitle);
  }
  async findOneForScript(id: number) {
    return await this.findOne({ where: { subtitle: { id } } });
  }

  async updateProgress(
    id: number,
    progress: number,
  ): Promise<KoreanSubtitle | void> {
    // Find the englishsubtitle related to the given subtitle id
    const koreansubtitle = await this.findOne({ where: { subtitle: { id } } });

    if (koreansubtitle) {
      // Update the progress of the found englishsubtitle
      koreansubtitle.progress = progress;

      // Save the updated englishsubtitle
      return await this.save(koreansubtitle);
    } else {
      console.log(`No englishsubtitle found with subtitle ID: ${id}`);
    }
  }
}
