import { IsNotEmpty } from 'class-validator';

export class TypingSaveDto {
  @IsNotEmpty()
  progress: number;
  @IsNotEmpty()
  typedWords: string;
}
