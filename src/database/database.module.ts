import { Global, Module } from '@nestjs/common';
import { PrismaService } from './services/prisma.service';
import { UserRepository } from './repository/user.repository';

@Global()
@Module({
  providers: [PrismaService, UserRepository],
  exports: [PrismaService, UserRepository],
})
export class DatabaseModule {}
