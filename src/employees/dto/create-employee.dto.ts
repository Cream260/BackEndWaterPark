import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @Length(3, 64)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH')
  tel: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  hourly: number;
}
