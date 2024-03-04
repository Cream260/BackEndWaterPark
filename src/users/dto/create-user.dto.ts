import { IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  email: string;

  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;

  name: string;

  tel: string;
}
