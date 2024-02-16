import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToOne,
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

  @Column({ length: '100', name: 'event_detail' })
  detail: string;

  @Column({ name: 'event_price' })
  price: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToOne(() => Receipt, (receipt) => receipt.event)
  receipt: Receipt;
}
