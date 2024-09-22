import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../../database/user/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { PaginationWithSortingDto } from '../dto/pagination-with-sorting.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { UserEditDto } from '../dto/user-edit.dto';
import { UserInfoDto } from '../dto/user-info.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';

@Controller()
@UseGuards(JwtAuthGuard, AdminGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('user')
  async addUser(@Body() userData: UserCreateDto): Promise<UserInfoDto> {
    const addedUser = this.userService.createUser(userData);
    return plainToInstance(UserInfoDto, addedUser);
  }

  @Delete('user/:id')
  async removeUser(@Param() id: number): Promise<UserInfoDto> {
    const user = this.userService.deleteUser({ id });
    return plainToInstance(UserInfoDto, user);
  }

  @Put('user/:id')
  async editUser(
    @Param('id') id: number,
    @Body() changes: UserEditDto,
  ): Promise<UserInfoDto> {
    if (Object.keys(changes).length == 0) {
      throw new BadRequestException('Nothing to edit');
    }
    const updatedUser = this.userService.updateUser({ id }, changes);
    return plainToInstance(UserInfoDto, updatedUser);
  }

  @Get('user/:id')
  async getUser(@Param('id') id: number): Promise<UserInfoDto> {
    const user = this.userService.user({ id });
    return plainToInstance(UserInfoDto, user);
  }

  @Get('user')
  async getUsers(
    @Query() pageAndSort: PaginationWithSortingDto,
    @Body() filters: UserFilterDto,
  ): Promise<UserInfoDto[]> {
    const { query, ...propertyConditions } = filters;
    return this.userService.findUsers({
      skip: pageAndSort.skip,
      take: pageAndSort.limit,
      orderBy: { [pageAndSort.sortBy || 'lastName']: pageAndSort.sortOrder },
      query,
      propertyConditions,
    });
  }
}
