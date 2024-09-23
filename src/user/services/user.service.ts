import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { UserInfoDto } from '../dto/user-info.dto';
import { ResultPage } from '../../common/interfaces/result-page';
import { UserRepository } from '../../database/repository/user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async getUserById(id: number): Promise<User | null> {
    return this.userRepository.findOneById(id);
  }

  async getUserByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneByEmail(email);
  }

  async findUsers(params: {
    skip: number;
    take: number;
    query?: string;
    propertyConditions?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<ResultPage<UserInfoDto>> {
    const { query, propertyConditions, ...pagination } = params;
    const queryCondition: Prisma.UserWhereInput = {
      OR: [
        { firstName: { contains: query } },
        { lastName: { contains: query } },
        { email: { contains: query } },
      ],
    };
    const filters = {
      ...(query ? queryCondition : {}),
      ...propertyConditions,
    };

    const totalCount = await this.userRepository.count(filters);
    const users = await this.userRepository.find(filters, pagination);
    return { totalCount, data: users };
  }

  async createUser(newUser: Prisma.UserCreateInput): Promise<User> {
    if (await this.userRepository.exists({ email: newUser.email })) {
      throw new BadRequestException('User already exists');
    }
    return this.userRepository.add(newUser);
  }

  async updateUser(id: number, changes: Prisma.UserUpdateInput): Promise<User> {
    if (!(await this.userRepository.exists({ id }))) {
      throw new BadRequestException("User doesn't exist");
    }
    return this.userRepository.update({ id }, changes);
  }

  async deleteUser(id: number): Promise<User> {
    return this.userRepository.delete({ id });
  }
}
