import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { Customer } from '../../customers/entities/customer.entity';
import { Package } from '../../package/entities/package.entity';
import { Event } from '../../event/entities/event.entity';
import { Promotion } from '../../promotions/entities/promotion.entity';

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn({ name: 'rec_id' })
  id: number;

  @Column({ name: 'rec_qty' })
  qty: number;

  @Column({ type: 'float', name: 'rec_totalPrice' })
  totalPrice: number;

  @Column({ type: 'float', name: 'rec_netPrice' })
  netPrice: number;

  @Column({ name: 'rec_numPeople', nullable: true }) // can be null
  numPeople: number;

  @Column({ length: '100', name: 'rec_nameComp', nullable: true }) // can be null
  nameComp: string;

  @Column({ type: 'float', name: 'discount' })
  discount: number;

  @Column({ type: 'float', name: 'received' })
  received: number;

  @Column({ name: 'payment' })
  payments: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Order, (order) => order.receipt)
  order: Order[];

  @ManyToOne(() => Customer, (customer) => customer.receipt)
  customer: Customer;

  @OneToOne(() => Package, (package_ticket) => package_ticket.receipt)
  package: Package;

  @OneToOne(() => Event, (event_ticket) => event_ticket.receipt)
  event: Event;

  @ManyToOne(() => Promotion, (promotion) => promotion.receipt)
  promotion: Promotion;
}
