import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  Body,
  Headers,
  Ip,
  ParseIntPipe,
  DefaultValuePipe,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { GetUsersParamsDto } from './dtos/get-users-params.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import { ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  // Injecting Users
  constructor(private readonly usersService: UsersService) {}
  /**
   * Final Endpoint - /users/id?limit=10&page=1
   * Parama id - optional, convert to integer, cannot have a default value
   * Query limit - integer, default 10
   * Query page - integer, default value 1
   * ==> USE CASES
   * /users/ -> return all users with default pagination
   * /users/1223 -> returns one user whos id is 1234
   * /users?limit=10&page=2 -> return page 2 with limt of pagination 10
   */

  @Get(':id')
  @ApiOperation({
    summary: 'Get all users',
  })
  @ApiResponse({
    status: 200,
    description: 'The found record',
    type: GetUsersParamsDto,
  })
  @ApiQuery({
    name: 'limit',
    type: Number,
    required: false,
  })
  @ApiQuery({
    name: 'page',
    type: Number,
    required: false,
  })
  public getUsers(
    @Param() getUsersParamsDto: GetUsersParamsDto,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
  ) {
    return this.usersService.finAll(getUsersParamsDto, limit, page);
  }

  @Post()
  public createUsers(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return 'You sent a post request to users endpoint';
  }

  @Patch()
  public patchUsers(@Body() patchUsersDto: PatchUserDto) {
    return patchUsersDto;
  }
}
