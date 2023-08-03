import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SubtitleService } from './subtitle.service';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('subtitle')
@UseGuards(AuthGuard())
export class SubtitleController {
  constructor(private subtitleService: SubtitleService) {}

  @Post()
  createSubtitle(
    @Body(ValidationPipe) createSubtitleDto: CreateSubtitleDto,
    @GetUser() user: User,
  ) {
    this.subtitleService.createSubtitle(createSubtitleDto, user);
  }
}
