import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackageDetail } from '../../package_details/entities/package_detail.entity';
import { OrderItem } from '../../orders/entities/order-item';

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

  @Column({ length: 500, name: 'ticket_image' })
  images: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.ticket)
  orderItems: OrderItem[];

  @OneToMany(() => PackageDetail, (package_detail) => package_detail.ticket)
  package_detail: PackageDetail[];
}
