import { Module } from '@nestjs/common';
import { SubtitleController } from './subtitle.controller';
import { SubtitleService } from './subtitle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtitle } from './entities/subtitle.entity';
import { KoreanSubtitle } from './entities/koreansubtitle.entity';
import { EnglishSubtitle } from './entities/englishsubtitle.entity';
import { TypingProgress } from './entities/typingprogress.entity';
import { AuthModule } from 'src/auth/auth.module';
import { SubtitleRepository } from './repository/subtitle.repository';
import { EnglishSubtitleRepository } from './repository/englishSubtitle.repository';
import { KoreanSubtitleRepository } from './repository/koreanSubtitle.repository';
import { TypingProgressRepository } from './repository/typingProgress.repository';

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
