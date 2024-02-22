import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Playground } from '../../playgrounds/entities/playground.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  id: number;

  @Column({ name: 'review_rate' })
  rate: number;

  @Column({ name: 'review_text' })
  text: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Customer, (customer) => customer.review)
  customer: Customer;

  @ManyToOne(() => Playground, (playground) => playground.review)
  playground: Playground;
}
