import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Subtitle } from '../entities/subtitle.entity';
import { CreateSubtitleDto } from '../dto/create-subtitle.dto';
import { User } from '../../auth/user.entity';

@Injectable()
export class SubtitleRepository extends Repository<Subtitle> {
  constructor(private dataSource: DataSource) {
    super(Subtitle, dataSource.createEntityManager());
  }
  //자막 생성
  async createSubtitle(createSubTitleDto: CreateSubtitleDto, user: User) {
    const { title } = createSubTitleDto;
    const subtitle = this.create({
      title,
      user,
    });
    return await this.save(subtitle);
  }
  //모든 업로드한 자막 조회
  async getAllMySubtitles(user: User) {
    const { id } = user;
    return await this.find({ where: { user: { id } } });
  }
  //자막 삭제
  async deleteSubtitleById(id: number) {
    const result = await this.delete(id);
    return result;
  }
}
