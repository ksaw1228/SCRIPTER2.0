import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards : Board[] = []

    getAllBoards() : Board[]{
        return this.boards
    }

    createBoard(creatBoradDto : CreateBoardDto){
        const {title,description} = creatBoradDto

        const board :Board = {
            id : uuid(),
            title,
            description,
            status: BoardStatus.PUBLIC
        }

        this.boards.push(board)
        return board
    }

    getBoardById(id:string) : Board{
        const found = this.boards.find(board=>board.id === id)
        if(!found){
            throw new NotFoundException(`can't find board id:${id}`)
        }
        return found
    }

    deleteBoard(id:string) : void{
        const found = this.getBoardById(id)//없으면 이 함수에서 에러날려줌
        this.boards = this.boards.filter(board=>board.id !== found.id)
    }

    updateBoardStatus(id:string,status:BoardStatus) : Board{
        const board = this.getBoardById(id)
        board.status = status
        return board
        //updateBoardStatus 함수에서 board 객체의 데이터가 수정되는 원리는 참조(reference)에 
        //기초한 동작 방식 때문입니다. JavaScript와 TypeScript에서 객체는 참조 값으로 전달되기 때문에 
        //원본 객체를 변경할 수 있습니다
    }
}
