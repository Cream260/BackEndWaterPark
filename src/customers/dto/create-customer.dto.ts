import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(11, 50)
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH')
  tel: string;
}
