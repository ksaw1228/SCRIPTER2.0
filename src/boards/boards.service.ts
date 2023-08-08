import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  getAllBoards(): Promise<Board[]> {
    return this.boardRepository.getAllBoard();
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  createBoard(CreateBoardDto: CreateBoardDto, user: User): Promise<Board> {
    return this.boardRepository.createBoard(CreateBoardDto, user);
  }

  //작성자 열람자 조회
  async getAuthorId(boardId: number) {
    const board = await this.boardRepository
      .createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .where('board.id = :id', { id: boardId })
      .getOne();
    if (!board) {
      throw new NotFoundException(`can't find ${boardId}`);
    }
    return board.user.id;
  }

  deletBoardById(id: number) {
    return this.boardRepository.deleteBoardById(id);
  }

  updateBoard(id: number, newBoard: CreateBoardDto) {
    return this.boardRepository.updateBoard(id, newBoard);
  }
}
