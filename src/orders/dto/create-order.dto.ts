import { IsNotEmpty, Min, IsOptional, Length } from 'class-validator';
import { Order } from '../entities/order.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

class CreatedOrderItemDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  ticketId: number;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  totalPrice: number;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  ticket?: Ticket; // Ticket Id

  @IsNotEmpty()
  order?: Order;
}
export class CreateOrderDto {
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
  numPeople?: number | null; // can be null or number

  @IsOptional() // เพื่อระบุว่าค่านี้มีความเป็นเลือกได้
  @Length(3, 100)
  nameComp?: string | null; // can be null or number

  @IsNotEmpty()
  @Min(0)
  discount: number;

  @IsNotEmpty()
  @Min(0)
  received: number;

  payments: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  expDate: Date;

  @IsNotEmpty()
  cusID: number;

  promoId?: number;

  eventId?: number;

  packageId?: number;

  orderItems?: CreatedOrderItemDto[];
}
