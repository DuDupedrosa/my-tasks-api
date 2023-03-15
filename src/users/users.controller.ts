import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserSignInDto } from './dto/signin.dto';
import { UserSignUpDto } from './dto/signup.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  //  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  public async create(@Body() userSignUpDto: UserSignUpDto) {
    return this.usersService.createUser(userSignUpDto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  public async login(@Body() userSignInDto: UserSignInDto) {
    return this.usersService.userSignin(userSignInDto);
  }
}
