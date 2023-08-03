import { IsNotEmpty } from 'class-validator';

export class SubtitleDto {
  content: string;
}

export class CreateSubtitleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  koreanSubtitle: SubtitleDto;

  @IsNotEmpty()
  englishSubtitle: SubtitleDto;
}
