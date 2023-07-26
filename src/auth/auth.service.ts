import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Injectable()
export class AuthService {
    constructor( private boardRepository: UserRepository){}

    creatUser(authCredentialDto:AuthCredentialDto){
        return this.boardRepository.creatUser(authCredentialDto)
    }
}
