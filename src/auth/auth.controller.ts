import {
  Body,
  Controller,
  HttpCode,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  // @UsePipes(ValidationPipe)
  creatUser(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto) {
    return this.authService.creatUser(authCredentialDto);
  }

  @Post('signin')
  @HttpCode(200)
  signIn(
    @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialDto);
  }
}
