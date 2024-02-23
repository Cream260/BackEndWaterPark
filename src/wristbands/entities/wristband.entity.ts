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
import { Receipt } from '../../receipts/entities/receipt.entity';
import { WristbandDetail } from '../../wristband_details/entities/wristband_detail.entity';

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

  @ManyToOne(() => Receipt, (reciept) => reciept.wristband)
  receipt: Receipt;

  @OneToMany(
    () => WristbandDetail,
    (wristbandDetail) => wristbandDetail.wristband,
  )
  wristbandDetail: WristbandDetail;
}
