import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Board } from '../boards/board.entity';
import { Subtitle } from '../subtitle/entities/subtitle.entity';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Board, (board) => board.user, { eager: true })
  boards: Board[];

  @OneToMany(() => Subtitle, (subtitle) => subtitle.user)
  subtitles: Subtitle[];
}
