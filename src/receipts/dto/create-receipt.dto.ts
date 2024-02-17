import { IsArray, IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';

export class CreateReceiptDto {
  @IsOptional() // เพื่อระบุว่าค่านี้มีความเป็นเลือกได้
  @Length(3, 100)
  name: string | null; // can be null or number

  @IsNotEmpty()
  @Min(0)
  qty: number;

  @IsNotEmpty()
  @Min(0)
  totalPrice: number;

  @IsNotEmpty()
  @Min(0)
  netPrice: number;

  @IsOptional() // เพื่อระบุว่าค่านี้มีความเป็นเลือกได้
  @Min(0)
  numPeople: number | null; // can be null or number

  @IsOptional() // เพื่อระบุว่าค่านี้มีความเป็นเลือกได้
  @Length(3, 100)
  nameComp: string | null; // can be null or number

  @IsNotEmpty()
  @Min(0)
  discount: number;

  @IsNotEmpty()
  @Min(0)
  received: number;

  @IsNotEmpty()
  payments: string;

  @IsNotEmpty()
  cusID: number;

  @IsNotEmpty()
  promoId: number;

  @IsNotEmpty()
  @IsArray()
  order: Order[];
}
