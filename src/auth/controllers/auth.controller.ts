import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { UserSignUpDto } from '../../user/dto/user-sign-up.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('sign-in')
  async login(@Request() req: Request) {
    return this.authService.login(req['user']);
  }

  @Post('sign-up')
  async signUp(@Body() userDetails: UserSignUpDto) {
    return this.authService.signUp({ isAdmin: false, ...userDetails });
  }
}
