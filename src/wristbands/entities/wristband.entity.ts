import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WristbandDetail } from '../../wristband_details/entities/wristband_detail.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Wristband {
  @PrimaryGeneratedColumn({ name: 'wristband_id' })
  id: number;

  @Column({ name: 'wristband_type' })
  type: string;

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

  @OneToMany(
    () => WristbandDetail,
    (wristband_detail) => wristband_detail.wristband,
  )
  wristband_detail: WristbandDetail[];

  @ManyToOne(() => Order, (order) => order.wristband)
  orders: Order;
}
