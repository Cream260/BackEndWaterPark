import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Order } from '../../orders/entities/order.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ name: 'cus_id' })
  id: number;

  @Column({ length: '50', name: 'cus_name' })
  name: string;

  @Column({ length: '100', name: 'cus_email', unique: true })
  email: string;

  @Column({ name: 'cus_tel' })
  tel: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Order, (order) => order.customer)
  orders: Order[];

  @OneToOne(() => User, (user) => user.customer)
  @JoinColumn()
  user: User;
}
