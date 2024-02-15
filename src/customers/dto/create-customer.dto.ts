import { IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Length(11, 50)
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH')
  tel: string;
}
