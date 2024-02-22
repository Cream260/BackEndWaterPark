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

@Entity()
export class Event {
  @PrimaryGeneratedColumn({ name: 'event_id' })
  id: number;

  @Column({ length: '50', name: 'event_name' })
  name: string;

  @Column({ type: 'float', name: 'event_price' })
  price: number;

  @Column({ length: '50', name: 'event_type' })
  type: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Receipt, (receipt) => receipt.event)
  receipt: Receipt[];
}
