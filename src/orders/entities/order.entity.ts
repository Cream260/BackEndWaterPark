import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column({ length: '50', name: 'order_name' })
  name: string;

  @Column({ type: 'float', name: 'order_price' })
  price: number;

  @Column({ type: 'float', name: 'order_totalPrice' })
  totalPrice: number;

  @Column({ name: 'order_qty' })
  qty: number;

  @Column({ name: 'order_startDate' })
  startDate: Date;

  @Column({ name: 'order_endDate' })
  endDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
