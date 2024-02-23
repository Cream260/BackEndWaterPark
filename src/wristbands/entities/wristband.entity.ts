import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Wristband {
  @PrimaryGeneratedColumn({ name: 'wristband_id' })
  id: number;

  @Column({ name: 'wristband_type' })
  type: string;

  @Column({ length: '100', name: 'ticket_detail' })
  detail: string;

  @Column({ name: 'wristband_startDate' })
  startDate: Date;

  @Column({ name: 'wristband_expirationDate' })
  endDate: Date;

  
  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  // @OneToMany(() => Order, (order) => order.ticket)
  // order: Order[];
}
