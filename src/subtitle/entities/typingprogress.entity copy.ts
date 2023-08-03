import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Subtitle } from './subtitle.entity';

@Entity()
export class TypingProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'numeric', default: 0 })
  progress: number;

  @Column({ type: 'text', default: '' })
  typedWords: string;

  @ManyToOne(() => Subtitle, (subtitle) => subtitle.typingProgress, {
    onDelete: 'CASCADE',
  })
  subtitle: Subtitle;
}
