import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthService } from 'src/auth/auth.service';
import { UserSignInDto } from './dto/signin.dto';
import { UserSignUpDto } from './dto/signup.dto';
import { User, UserCreatedReturn } from './models/users.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private usersModel: Model<User>,
    private authService: AuthService,
  ) {}

  public async createUser(
    userSignUpDto: UserSignUpDto,
  ): Promise<UserCreatedReturn> {
    const { email, name } = userSignUpDto;
    const alreadyExistUser = await this.usersModel.findOne({ email });

    if (alreadyExistUser) {
      throw new HttpException(
        'This is email already registered',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const user = new this.usersModel(userSignUpDto);
    await user.save();

    const findCreatedUser = await this.findUserByEmail(email);
    const jwtToken = await this.authService.createAccessToken(
      findCreatedUser._id,
    );

    const userReturn = {
      name: name,
      email: email,
      id: findCreatedUser._id,
      jwtToken,
    };

    return userReturn;
  }

  public async userSignin(
    userSigninDto: UserSignInDto,
  ): Promise<UserCreatedReturn> {
    const { email, password } = userSigninDto;

    const user = await this.usersModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('This account is not register');
    }

    const checkPassword = await this.checkPassword(password, user);

    if (!checkPassword) {
      throw new NotFoundException('Invalid password');
    }

    const jwtToken = await this.authService.createAccessToken(user._id);

    return {
      name: user.name,
      email: user.email,
      jwtToken,
      id: user._id,
    };
  }

  private async findUserByEmail(email: string) {
    const user = this.usersModel.findOne({ email });

    if (!user) {
      throw new NotFoundException('Email not found');
    }

    return user;
  }

  private async checkPassword(password: string, user: User): Promise<boolean> {
    const match = await bcrypt.compare(password, user.password);

    return match;
  }
}
