import { IsBoolean, IsEmail, IsOptional, IsString } from 'class-validator';

export class UserEditDto {
  @IsString()
  @IsOptional()
  firstName: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsEmail()
  @IsOptional()
  email: string;

  @IsOptional()
  @IsBoolean()
  isAdmin: boolean;
}
