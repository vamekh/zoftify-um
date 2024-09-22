import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, User } from '@prisma/client';
import { UserInfoDto } from '../../user/dto/user-info.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async user(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    return this.prisma.user.findUnique({ where: userWhereUniqueInput });
  }

  async findUsers(params: {
    skip?: number;
    take: number;
    cursor?: Prisma.UserWhereUniqueInput;
    query?: string;
    propertyConditions?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<UserInfoDto[]> {
    const { query, propertyConditions, ...pagination } = params;
    const queryCondition: Prisma.UserWhereInput = {
      OR: [
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { email: { contains: query } },
      ],
    };
    const where = {
      ...(query ? queryCondition : {}),
      ...propertyConditions,
    };

    const users = await this.prisma.user.findMany({ ...pagination, where });
    return plainToInstance(UserInfoDto, users);
  }

  async userExists(where: Prisma.UserWhereUniqueInput) {
    return !!(await this.prisma.user.findUnique({ where }));
  }

  async createUser(data: Prisma.UserCreateInput): Promise<User> {
    if (await this.userExists({ email: data.email })) {
      throw new BadRequestException('User already exists');
    }
    return this.prisma.user.create({ data });
    // TODO Send the email to the user to set the password
  }

  async updateUser(
    where: Prisma.UserWhereUniqueInput,
    data: Prisma.UserUpdateInput,
  ): Promise<User> {
    if (!(await this.userExists(where))) {
      throw new BadRequestException("User doesn't exist");
    }
    return this.prisma.user.update({ data, where });
  }

  async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({ where });
  }
}
