import { IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';
export class CreateTicketDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @MinLength(5)
  detail: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @MinLength(1)
  type: string;
}
