import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer } from '../../customers/entities/customer.entity';
import { Package } from '../../package/entities/package.entity';
import { Event } from '../../event/entities/event.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';
import { Wristband } from '../../wristbands/entities/wristband.entity';
import { OrderItem } from './order-item';

@Entity()
export class Order {
  @PrimaryGeneratedColumn({ name: 'order_id' })
  id: number;

  @Column({ name: 'order_qty' })
  qty: number;

  @Column({ type: 'float', name: 'order_totalPrice' })
  totalPrice: number;

  @Column({ type: 'float', name: 'order_netPrice' })
  netPrice: number;

  @Column({ name: 'order_numPeople', nullable: true }) // can be null
  numPeople?: number;

  @Column({ length: '100', name: 'order_nameComp', nullable: true }) // can be null
  nameComp?: string;

  @Column({ type: 'float', name: 'discount' })
  discount: number;

  @Column({ type: 'float', name: 'received' })
  received: number;

  @Column({ name: 'payment' })
  payments: string;

  @Column({ name: 'order_startDate' })
  startDate: Date;

  @Column({ name: 'order_expirationDate' })
  expDate: Date;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Wristband, (wristband) => wristband.orders)
  wristband: Wristband[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orders)
  orderItems: OrderItem[];

  @ManyToOne(() => Customer, (customer) => customer.orders)
  customer: Customer;

  @ManyToOne(() => Package, (package_ticket) => package_ticket.orders)
  package: Package;

  @ManyToOne(() => Event, (event_ticket) => event_ticket.orders)
  event: Event;

  @ManyToOne(() => Promotion, (promotion) => promotion.orders)
  promotion: Promotion;
}
