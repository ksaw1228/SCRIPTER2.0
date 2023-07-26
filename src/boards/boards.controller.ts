import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import {BoardsService} from './boards.service'
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
import { Board } from './board.entity';

@Controller('boards')
export class BoardsController {
    constructor(private boardsService : BoardsService){}

    @Get('/')
    getAllBoards():Promise<Board[]>{
        return this.boardsService.getAllBoards()
    }

    @Get('/:id')
    getBoardById(@Param('id', ParseIntPipe) id :number) : Promise<Board> {
        return this.boardsService.getBoardById(id)
    }

    @Post()
    @UsePipes(ValidationPipe)
    creatBorad(@Body() creatBoradDto: CreateBoardDto): Promise<Board>{
        return this.boardsService.createBoard(creatBoradDto)
    }

    @Delete('/:id')
    deletBoardById(@Param('id', ParseIntPipe) id : number){
        return this.boardsService.deletBoardById(id)
    }

    @Patch('/:id')
    @UsePipes(ValidationPipe)
    updateBoard(@Param('id', ParseIntPipe) id:number,@Body() newBoard:CreateBoardDto){
        return this.boardsService.updateBoard(id,newBoard)
    }

}
