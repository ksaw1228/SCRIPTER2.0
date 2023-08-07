import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SubtitleService } from './subtitle.service';
import { CreateSubtitleDto } from './dto/create-subtitle.dto';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { ScriptSaveDto } from './dto/script-save.dto';
import { TypingSaveDto } from './dto/typing-save.dto';

@Controller('subtitle')
@UseGuards(AuthGuard())
export class SubtitleController {
  constructor(private subtitleService: SubtitleService) {}

  //자막 업로드
  @Post()
  createSubtitle(
    @Body(ValidationPipe) createSubtitleDto: CreateSubtitleDto,
    @GetUser() user: User,
  ) {
    this.subtitleService.createSubtitle(createSubtitleDto, user);
  }

  //업로드한 전체 자막 목록
  @Get()
  getAllMySubtitles(@GetUser() user: User) {
    return this.subtitleService.getAllMySubtitles(user);
  }

  //자막 스크립트
  @Get('/:id/script')
  async findOneForScript(@Param('id') id: number, @GetUser() user: User) {
    const authorId = await this.subtitleService.getAuthorId(id);
    if (authorId !== user.id) {
      throw new HttpException('Permission Error', HttpStatus.FORBIDDEN);
    }
    return await this.subtitleService.findOneForScript(id);
  }

  @Patch('/:id/script')
  updateScriptProgress(
    @Param('id') id: number,
    @Body(ValidationPipe) scriptSave: ScriptSaveDto,
  ) {
    return this.subtitleService.updateScriptProgress(id, scriptSave);
  }

  //자막 타이핑
  @Get('/:id/typing')
  async findOneForTyping(@Param('id') id: number, @GetUser() user: User) {
    const authorId = await this.subtitleService.getAuthorId(id);
    if (authorId !== user.id) {
      throw new HttpException('Permission Error', HttpStatus.FORBIDDEN);
    }
    return this.subtitleService.findOneForTyping(id);
  }

  @Patch('/:id/typing')
  updateTypingProgress(
    @Param('id') id: number,
    @Body(ValidationPipe) typingSaveDto: TypingSaveDto,
  ) {
    this.subtitleService.updateTypingProgress(id, typingSaveDto);
  }

  @Delete('/:id')
  async deleteSubtitle(@Param('id') id: number, @GetUser() user: User) {
    const authorId = await this.subtitleService.getAuthorId(id);
    if (authorId !== user.id) {
      throw new HttpException('Permission Error', HttpStatus.FORBIDDEN);
    }
    return this.subtitleService.deletSubtitleById(id);
  }
}
