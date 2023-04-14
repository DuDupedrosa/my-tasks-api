import { IsNotEmpty, IsString } from 'class-validator';

export class EditPasswordDto {
  @IsString()
  @IsNotEmpty()
  currentPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
