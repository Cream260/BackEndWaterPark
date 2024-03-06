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

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn({ name: 'promo_id' })
  id: number;

  @Column({ length: '50', name: 'promo_name' })
  name: string;

  @Column({ length: '50', name: 'promo_code' })
  code: string;

  @Column({ name: 'promo_detail' })
  detail: string;

  @Column({ name: 'promo_startDate' })
  startDate: Date;

  @Column({ name: 'promo_endDate' })
  endDate: Date;

  @Column({ type: 'float', name: 'promo_discount' })
  discount: number;

  @Column({ length: 500, name: 'promo_image' })
  images: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Order, (order) => order.promotion)
  orders: Order[];
}
