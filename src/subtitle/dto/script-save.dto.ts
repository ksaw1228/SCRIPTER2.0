import { IsNotEmpty } from 'class-validator';

export class ScriptSaveDto {
  @IsNotEmpty()
  enSubtitleProgress: number;

  @IsNotEmpty()
  koSubtitleProgress: number;
}
