import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subtitle } from './subtitle.entity';

@Entity()
export class EnglishSubtitle {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'numeric', default: 0 })
  progress: number;

  @ManyToOne(() => Subtitle, (subtitle) => subtitle.englishSubtitles)
  subtitle: Subtitle;
}
