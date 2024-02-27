import { IsNotEmpty, IsNumber, Length, Min } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Min(0)
  totalPrice: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  qty: number;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  recID: number;

  @IsNotEmpty()
  ticketID: number;
}
