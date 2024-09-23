import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { plainToInstance } from 'class-transformer';
import { UserInfoDto } from '../../user/dto/user-info.dto';
import { Prisma, User } from '@prisma/client';
import { UserRepository } from '../../database/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Validate the user and return user data if successful
  async validateUser(email: string, pass: string): Promise<UserInfoDto> {
    const user = await this.userRepository.findOneByEmail(email);
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

  async signUp(newUser: Prisma.UserCreateInput): Promise<User> {
    if (await this.userRepository.exists({ email: newUser.email })) {
      throw new BadRequestException('User already exists');
    }
    const encryptedPassword = await bcrypt.hash(newUser.password, 10);
    return this.userRepository.add({
      password: encryptedPassword,
      ...newUser,
    });
  }
}
