import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { PackageDetail } from '../../package_details/entities/package_detail.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn({ name: 'ticket_id' })
  id: number;

  @Column({ length: '50', name: 'ticket_name' })
  name: string;

  @Column({ type: 'float', name: 'ticket_price' })
  price: number;

  @Column({ name: 'ticket_type' })
  type: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Order, (order) => order.ticket)
  order: Order[];

  @OneToMany(() => PackageDetail, (package_detail) => package_detail.ticket)
  package_detail: PackageDetail[];
}
