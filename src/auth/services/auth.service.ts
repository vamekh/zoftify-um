import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../database/user/user.service';
import { plainToInstance } from 'class-transformer';
import { UserInfoDto } from '../../user/dto/user-info.dto';
import { Prisma, User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  // Validate the user and return user data if successful
  async validateUser(email: string, pass: string): Promise<UserInfoDto> {
    const user = await this.usersService.user({ email });
    if (user && (await bcrypt.compare(pass, user.password))) {
      return plainToInstance(UserInfoDto, user);
    }
    return null;
  }

  // Generate a JWT token
  async login(user: any) {
    const payload = {
      username: user.email,
      sub: user.id,
      isAdmin: user.isAdmin,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async signUp(data: Prisma.UserCreateInput): Promise<User> {
    const encryptedPassword = await bcrypt.hash(data.password, 10);
    return this.usersService.createUser({
      password: encryptedPassword,
      ...data,
    });
  }
}
