import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @Column({ name: 'rec_numPeople' })
  numPeople: number;

  @Column({ length: '100', name: 'rec_nameComp' })
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
}
