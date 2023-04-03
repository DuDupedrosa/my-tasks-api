import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserEditDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  _id: string;
}
