import { DataSource, Repository } from 'typeorm';
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import {User} from './user.entity'
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class UserRepository extends Repository<User>{
    constructor(private dataSource: DataSource)
    { super(User, dataSource.createEntityManager()) }

    async creatUser(authCredentialDto:AuthCredentialDto):Promise<void>{
        const {username,password} = authCredentialDto
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(password, salt)

        const user = this.create({username,password:hashedPassword})//인스턴스 간단하게 생성

        try{
            await this.save(user)
        }catch(error){
            if(error.code = '23505'){
                throw new ConflictException('id 중복')
            }else{
                throw new InternalServerErrorException()
            }
        }
    }


}


