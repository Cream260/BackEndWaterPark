import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Receipt } from '../../receipts/entities/receipt.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column({ length: '50', name: 'order_name' })
  name: string;

  @Column({ name: 'order_type' })
  type: string;

  @Column({ type: 'float', name: 'order_price' })
  price: number;

  @Column({ type: 'float', name: 'order_totalPrice' })
  totalPrice: number;

  @Column({ name: 'order_qty' })
  qty: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Receipt, (receipt) => receipt.order)
  receipt: Receipt;

  @ManyToOne(() => Ticket, (ticket) => ticket.order)
  ticket: Ticket;
}
