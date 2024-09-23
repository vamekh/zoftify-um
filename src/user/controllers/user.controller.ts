import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserCreateDto } from '../dto/user-create.dto';
import { PaginationWithSortingDto } from '../dto/pagination/pagination-with-sorting.dto';
import { UserFilterDto } from '../dto/user-filter.dto';
import { UserEditDto } from '../dto/user-edit.dto';
import { UserInfoDto } from '../dto/user-info.dto';
import { plainToInstance } from 'class-transformer';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { AdminGuard } from '../../auth/guards/admin.guard';
import { Response } from 'express';

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
  async removeUser(@Param('id', ParseIntPipe) id: number): Promise<UserInfoDto> {
    const user = this.userService.deleteUser(id);
    return plainToInstance(UserInfoDto, user);
  }

  @Put('user/:id')
  async editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() changes: UserEditDto,
  ): Promise<UserInfoDto> {
    if (Object.keys(changes).length == 0) {
      throw new BadRequestException('Nothing to edit');
    }
    const updatedUser = this.userService.updateUser(id, changes);
    return plainToInstance(UserInfoDto, updatedUser);
  }

  @Get('user/:id')
  async getUser(@Param('id', ParseIntPipe) id: number): Promise<UserInfoDto> {
    const user = await this.userService.getUserById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return plainToInstance(UserInfoDto, user);
  }

  @Get('user')
  async getUsers(
    @Query() pageAndSort: PaginationWithSortingDto,
    @Body() filters: UserFilterDto,
    @Res() res: Response,
  ): Promise<void> {
    const { query, ...propertyConditions } = filters;
    const page = await this.userService.findUsers({
      skip: pageAndSort.skip,
      take: pageAndSort.limit,
      orderBy: { [pageAndSort.sortBy || 'lastName']: pageAndSort.sortOrder },
      query,
      propertyConditions,
    });
    res.set('X-Total-Count', page.totalCount.toString());
    res.json(plainToInstance(UserInfoDto, page.data));
  }
}
