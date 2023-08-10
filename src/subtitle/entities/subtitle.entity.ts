import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from '../../auth/user.entity';
import { TypingProgress } from './typingprogress.entity';
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
  )
  typingProgress: TypingProgress[];

  @OneToMany(
    () => KoreanSubtitle,
    (korean_subtitle) => korean_subtitle.subtitle,
  )
  koreanSubtitles: KoreanSubtitle[];

  @OneToMany(
    () => EnglishSubtitle,
    (english_subtitle) => english_subtitle.subtitle,
  )
  englishSubtitles: EnglishSubtitle[];
}
