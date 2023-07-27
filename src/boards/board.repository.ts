import {DataSource, Repository} from 'typeorm';
import {Injectable,NotFoundException} from '@nestjs/common';
import {Board} from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { BoardStatus } from './boards.status-enum';
import { User } from 'src/auth/user.entity';


@Injectable()
export class BoardRepository extends Repository<Board>
{
    constructor(private dataSource: DataSource)
    {
        super(Board, dataSource.createEntityManager());
    }

    async getAllBoard():Promise<Board[]>{
        // const allBoards = await this.find({select:['title']})
        const allBoards = await this.find()
        return allBoards
    }

    async getBoardById(id:number) : Promise<Board>{

        const found = await this.findOneBy({id:id})
        if(!id){throw new NotFoundException(`can't find ${id}`)}
        else{return found}
    }

    async createBoard(CreateBoardDto : CreateBoardDto,user:User) :Promise<Board>{
        const {title,description} = CreateBoardDto

        // const board = new Board();
        // board.title = title;
        // board.description = description;
        // board.status = BoardStatus.PUBLIC;
        //아래처럼 create로 작성하면 Board 인스턴스를 바로 생성 가능하다
        const board = this.create({
            title,
            description,
            status : BoardStatus.PUBLIC,
            user
        })
        await this.save(board)
        return board
    }

    async deleteBoardById(id:number){
        const result = await this.delete(id)
        return(result)
    }

    async updateBoard(id:number,newBoard:CreateBoardDto){
        const board = await this.getBoardById(id)

        board.title = newBoard.description
        board.description = newBoard.description

        await this.save(board)
        return board
    }
}