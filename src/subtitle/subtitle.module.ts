import { Module } from '@nestjs/common';
import { SubtitleController } from './subtitle.controller';
import { SubtitleService } from './subtitle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './entities/subtitle.entity';
import { KoreanSubtitle } from './entities/koreansubtitle.entity';
import { EnglishSubtitle } from './entities/englishsubtitle.entity';
import { TypingProgress } from './entities/typingprogress.entity';
import { AuthModule } from '../auth/auth.module';
import { SubtitleRepository } from './repository/subtitle.repository';
import { EnglishSubtitleRepository } from './repository/englishsubtitle.repository';
import { KoreanSubtitleRepository } from './repository/koreansubtitle.repository';
import { TypingProgressRepository } from './repository/typingprogress.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Subtitle,
      KoreanSubtitle,
      EnglishSubtitle,
      TypingProgress,
    ]),
    AuthModule,
  ],
  controllers: [SubtitleController],
  providers: [
    SubtitleService,
    SubtitleRepository,
    EnglishSubtitleRepository,
    KoreanSubtitleRepository,
    TypingProgressRepository,
  ],
})
export class SubtitleModule {}
