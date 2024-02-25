import { IsNotEmpty, IsOptional, Length, Min } from 'class-validator';
import { Order } from '../../orders/entities/order.entity';
// import { Wristband } from '../../wristbands/entities/wristband.entity';

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
  startDare: Date;

  @IsNotEmpty()
  expDate: Date;

  @IsNotEmpty()
  cusID: number;

  @IsNotEmpty()
  promoId: number;

  @IsNotEmpty()
  eventId: number;

  @IsNotEmpty()
  packageId: number;

  @IsNotEmpty()
  order: Order[];

  //   @IsNotEmpty()
  //   wristband: Wristband[];
}
