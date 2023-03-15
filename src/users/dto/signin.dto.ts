import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserSignInDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
