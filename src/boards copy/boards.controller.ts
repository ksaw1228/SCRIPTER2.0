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
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('boards')
@UseGuards(AuthGuard()) //토큰이 없으면 아래 모든 요청에 접근 불가능 또한 req안에 유저정보가 항상 포함되어있음
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
  deletBoardById(@Param('id', ParseIntPipe) id: number) {
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
