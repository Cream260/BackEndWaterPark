import {
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  Entity,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: '50', name: 'orderItem_name' })
  name: string;

  @Column({ name: 'orderItem_type' })
  type: string;

  @Column({ type: 'float', name: 'orderItem_price' })
  price: number;

  @Column({ type: 'float', name: 'orderItem_totalPrice' })
  totalPrice: number;

  @Column({ name: 'orderItem_qty' })
  qty: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Order, (order) => order.orderItems)
  orders: Order;

  @ManyToOne(() => Ticket, (ticket) => ticket.orderItems)
  ticket: Ticket;
}
