import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import {User} from './user.entity'
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource)
    { super(User, dataSource.createEntityManager()) }

    async creatUser(authCredentialDto:AuthCredentialDto):Promise<void>{
        const {username,password} = authCredentialDto
        const user = this.create({username,password})//인스턴스 간단하게 생성

        await this.save(user)
    }


}


