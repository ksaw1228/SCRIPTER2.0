import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor( private boardRepository: BoardRepository){}

    getAllBoards(): Promise<Board[]> {
        return this.boardRepository.getAllBoard()
    }

    getBoardById(id:number) : Promise<Board>{
        return this.boardRepository.getBoardById(id)
    }

    createBoard(CreateBoardDto : CreateBoardDto, user:User) :Promise<Board>{
       return this.boardRepository.createBoard(CreateBoardDto,user)
    }

    deletBoardById(id:number) {
        return this.boardRepository.deleteBoardById(id)
    }

    updateBoard(id:number,newBoard:CreateBoardDto){
        return this.boardRepository.updateBoard(id,newBoard)
    }



    // getAllBoards() : Board[]{
    //     return this.boards
    // }

    // deleteBoard(id:string) : void{
    //     const found = this.getBoardById(id)//없으면 이 함수에서 에러날려줌
    //     this.boards = this.boards.filter(board=>board.id !== found.id)
    // }

    // updateBoardStatus(id:string,status:BoardStatus) : Board{
    //     const board = this.getBoardById(id)
    //     board.status = status
    //     return board
    //     //updateBoardStatus 함수에서 board 객체의 데이터가 수정되는 원리는 참조(reference)에 
    //     //기초한 동작 방식 때문입니다. JavaScript와 TypeScript에서 객체는 참조 값으로 전달되기 때문에 
    //     //원본 객체를 변경할 수 있습니다
    // }
}
