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

  async findOneForScript(id: number) {
    return await this.findOne({ where: { subtitle: { id } } });
  }

  async updateProgress(
    id: number,
    progress: number,
  ): Promise<EnglishSubtitle | void> {
    // Find the englishsubtitle related to the given subtitle id
    const englishsubtitle = await this.findOne({ where: { subtitle: { id } } });

    if (englishsubtitle) {
      // Update the progress of the found englishsubtitle
      englishsubtitle.progress = progress;

      // Save the updated englishsubtitle
      return await this.save(englishsubtitle);
    } else {
      console.log(`No englishsubtitle found with subtitle ID: ${id}`);
    }
  }
}
