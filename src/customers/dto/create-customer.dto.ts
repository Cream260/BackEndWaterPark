import { IsEmail, IsNotEmpty, IsPhoneNumber, Length } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Length(3, 64)
  username: string;

  @IsNotEmpty()
  @Length(3, 64)
  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  // )
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsPhoneNumber('TH')
  tel: string;
}
