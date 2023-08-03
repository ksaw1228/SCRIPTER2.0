import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Subtitle } from '../entities/subtitle.entity';
import { CreateSubtitleDto } from '../dto/create-subtitle.dto';
import { User } from 'src/auth/user.entity';

@Injectable()
export class SubtitleRepository extends Repository<Subtitle> {
  constructor(private dataSource: DataSource) {
    super(Subtitle, dataSource.createEntityManager());
  }
  async createSubtitle(createSubTitleDto: CreateSubtitleDto, user: User) {
    const { title } = createSubTitleDto;
    const subtitle = this.create({
      title,
      user,
    });
    return await this.save(subtitle);
  }
}
