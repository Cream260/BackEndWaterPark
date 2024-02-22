import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Receipt } from '../../receipts/entities/receipt.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ name: 'cus_id' })
  id: number;

  @Column({ name: 'cus_username', unique: true })
  username: string;

  @Column({ name: 'cus_password' })
  password: string;

  @Column({ length: '50', name: 'cus_name' })
  name: string;

  @Column({ length: '100', name: 'cus_email', unique: true })
  email: string;

  @Column({ unique: true, name: 'cus_tel' })
  tel: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Receipt, (receipt) => receipt.customer)
  receipt: Receipt[];

  @OneToMany(() => Review, (review) => review.customer)
  review: Review[];
}
