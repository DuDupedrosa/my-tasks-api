import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Headers,
  UseGuards,
  Put,
} from '@nestjs/common';
import { UserSignInDto } from './dto/signin.dto';
import { UserSignUpDto } from './dto/signup.dto';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { UserEditDto } from './dto/userEdit.dto';
import { EditPasswordDto } from './dto/editPassword.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
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

  @Put('edit')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async editUser(@Body() userEditDto: UserEditDto) {
    return this.usersService.userEdit(userEditDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async getUser(@Headers('Authorization') authToken: string) {
    return this.usersService.getUser(authToken);
  }

  @Post('edit/password')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('jwt'))
  public async editPassword(
    @Body() editPasswordDto: EditPasswordDto,
    @Headers('Authorization') authToken: string,
  ) {
    return this.usersService.editPassword(editPasswordDto, authToken);
  }
}
