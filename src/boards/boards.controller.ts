import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../auth/user.entity';
import { GetUser } from '../auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard())
export class BoardsController {
  constructor(private boardsService: BoardsService) {}

  @Get('/')
  getAllBoards(): Promise<Board[]> {
    return this.boardsService.getAllBoards();
  }

  @Get('/:id')
  getBoardById(@Param('id', ParseIntPipe) id: number): Promise<Board> {
    return this.boardsService.getBoardById(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)
  creatBorad(
    @Body(ValidationPipe) creatBoradDto: CreateBoardDto,
    @GetUser() user: User,
  ): Promise<Board> {
    return this.boardsService.createBoard(creatBoradDto, user);
  }

  @Delete('/:id')
  async deleteSubtitle(@Param('id') id: number, @GetUser() user: User) {
    const authorId = await this.boardsService.getAuthorId(id);
    if (authorId !== user.id) {
      throw new HttpException('Permission Error', HttpStatus.FORBIDDEN);
    }
    return this.boardsService.deletBoardById(id);
  }

  @Patch('/:id')
  @UsePipes(ValidationPipe)
  updateBoard(
    @Param('id', ParseIntPipe) id: number,
    @Body() newBoard: CreateBoardDto,
  ) {
    return this.boardsService.updateBoard(id, newBoard);
  }
}
