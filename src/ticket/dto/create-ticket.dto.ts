import { IsNotEmpty, IsNumber, Length, Min } from 'class-validator';
export class CreateTicketDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Length(3, 100)
  detail: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  type: string;
}
