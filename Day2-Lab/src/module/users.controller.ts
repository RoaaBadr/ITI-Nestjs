/* eslint-disable prettier/prettier */
import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto  , LoginUserDto , UserProfileDto } from './dto/user-dto';
import { IsAuthenticatedMiddleware  } from '../auth/is-authenticated.middleware';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthenticatedRequest } from './types';


@ApiTags('users')
@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/sign-up')
  @ApiOperation({ summary: 'User sign up' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  async signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/sign-in')
  @ApiOperation({ summary: 'User sign in' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  async signIn(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.login(loginUserDto);
  }

  @Get('/my-profile')
  @UseGuards(IsAuthenticatedMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get authenticated user profile' })
  @ApiResponse({ status: 200, type: UserProfileDto, description: 'User profile returned successfully' })
  async getProfile(@Req() req: AuthenticatedRequest) {
    return this.usersService.findUserByEmail(req.user.email);
  }

  @Get('all')
  @UseGuards(IsAuthenticatedMiddleware)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users except current user' })
  @ApiResponse({ status: 200, type: [UserProfileDto], description: 'Users list returned successfully' })
  async getAllUsers(@Req() req: AuthenticatedRequest) {
    return this.usersService.findAllUsers(req.user.email);
  }
}