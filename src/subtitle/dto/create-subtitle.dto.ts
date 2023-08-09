import { Type } from 'class-transformer';
import { IsNotEmpty, ValidateNested } from 'class-validator';

export class SubtitleDto {
  @IsNotEmpty()
  content: string;
}

export class CreateSubtitleDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SubtitleDto)
  koreanSubtitle: SubtitleDto;

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => SubtitleDto)
  englishSubtitle: SubtitleDto;
}
