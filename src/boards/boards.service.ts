import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardRepository } from './board.repository';
import { Board } from './entities/board.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
  constructor(private boardRepository: BoardRepository) {}

  parseSrtSubtitle(data) {
    data = data.replace(/&nbsp;/gi, ' ');
    data = data.replace(/<br>/gi, '\u200B');
    data = data.replace(/<.*?>/g, '');
    data = data.replace(/<!--[\s\S]*?-->/g, '');
    data = data.replace(/\u200B/gi, ' ');

    const lines = data.trim().split(/\r?\n\r?\n/);

    return lines.reduce((acc, item, index) => {
      const content = item
        .split(/\r?\n/)
        .slice(2)
        .join(' ')
        .replace(/<\/?[^>]+(>|$)/g, '');

      // Check if line is a time code
      const isTimeCode =
        /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/.test(content);
      // Check if line is a number right above a time code (in srt format)
      const isNumberAboveTimeCode =
        /^\d+$/.test(content) &&
        /^\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/.test(
          lines[index + 1],
        );

      if (
        content &&
        /\S/.test(content) &&
        !isTimeCode &&
        !isNumberAboveTimeCode
      ) {
        const cleaned = content
          .replace(/<[\s\S]*?>/g, '')
          .replace(/^\([^)]*\)/, '')
          .trim()
          .replace(/\r$/, '')
          .replace(/\\(?=")/g, '');
        if (cleaned) {
          acc.push(cleaned);
        }
      }
      return acc;
    }, []);
  }

  getMyBoard(uesrId: number): Promise<Board[]> {
    return this.boardRepository.getMyBoard(uesrId);
  }

  getBoardById(id: number): Promise<Board> {
    return this.boardRepository.getBoardById(id);
  }

  async createBoard(
    CreateBoardDto: CreateBoardDto,
    user: User,
  ): Promise<Board> {
    //자막데이터 : CreateBoardDto JSON에 파일 확장자도 같이 넣어보내줘야함
    const data = await this.parseSrtSubtitle(CreateBoardDto.description);
    CreateBoardDto.description = data;
    return this.boardRepository.createBoard(CreateBoardDto, user);
  }

  deletBoardById(id: number) {
    return this.boardRepository.deleteBoardById(id);
  }

  updateBoard(id: number, newBoard: CreateBoardDto) {
    return this.boardRepository.updateBoard(id, newBoard);
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
