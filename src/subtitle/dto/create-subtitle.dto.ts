import { IsNotEmpty } from 'class-validator';

export class SubtitleDto {
  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  fileExtension: string;
}

export class CreateSubtitleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  koreanSubtitle: SubtitleDto;

  @IsNotEmpty()
  englishSubtitle: SubtitleDto;
}
