import { IsNotEmpty, Min } from 'class-validator';

export class CreateReceiptDto {
  @IsNotEmpty()
  @Min(0)
  qty: number;

  @IsNotEmpty()
  @Min(0)
  totalPrice: number;

  @IsNotEmpty()
  @Min(0)
  netPrice: number;

  numPeople: number; //ยังไม่ ok

  nameComp: string;

  @IsNotEmpty()
  @Min(0)
  discount: number;

  @IsNotEmpty()
  @Min(0)
  received: number;

  @IsNotEmpty()
  payments: string;
}
