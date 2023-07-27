import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcryptjs'
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
         private userRepository: UserRepository,
         private jwtService : JwtService
        ){}

    creatUser(authCredentialDto:AuthCredentialDto){
        return this.userRepository.creatUser(authCredentialDto)
    }

    async signIn(authCredentialDto: AuthCredentialDto) : Promise<{accessToken:string}>{
        const { username, password} = authCredentialDto
        const user = await this.userRepository.findOneBy({username:username})

        if(user && (await bcrypt.compare(password, user.password))){
            const payload = { username }
            const accessToken = await this.jwtService.sign(payload)

            return { accessToken : accessToken }
        }else{
            throw new UnauthorizedException('login failed')
        }
    }
}
