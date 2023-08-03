import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { TypingProgress } from './typingProgress.entity';
import { KoreanSubtitle } from './koreansubtitle.entity';
import { EnglishSubtitle } from './englishsubtitle.entity';

@Entity()
export class Subtitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @ManyToOne(() => User, (appuser) => appuser.subtitles, { eager: false })
  user: User;

  @OneToMany(
    () => TypingProgress,
    (typing_progress) => typing_progress.subtitle,
    {
      onDelete: 'CASCADE',
    },
  )
  typingProgress: TypingProgress[];

  @OneToMany(
    () => KoreanSubtitle,
    (korean_subtitle) => korean_subtitle.subtitle,
    {
      onDelete: 'CASCADE',
    },
  )
  koreanSubtitles: KoreanSubtitle[];

  @OneToMany(
    () => EnglishSubtitle,
    (english_subtitle) => english_subtitle.subtitle,
    {
      onDelete: 'CASCADE',
    },
  )
  englishSubtitles: EnglishSubtitle[];
}
