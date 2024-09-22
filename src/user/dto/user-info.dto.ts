import { Exclude } from 'class-transformer';

export class UserInfoDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;

  @Exclude()
  password?: string;
}
