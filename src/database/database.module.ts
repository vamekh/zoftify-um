import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { UserService } from './user/user.service';

@Module({
  providers: [PrismaService, UserService],
  exports: [PrismaService, UserService],
})
export class DatabaseModule {}
