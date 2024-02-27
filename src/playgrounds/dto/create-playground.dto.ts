import { IsNotEmpty, Length } from 'class-validator';

export class CreatePlaygroundDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  installDate: Date;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  condition: string;

  @IsNotEmpty()
  images: string;
}
