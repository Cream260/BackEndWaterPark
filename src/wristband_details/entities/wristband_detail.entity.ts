import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Wristband } from '../../wristbands/entities/wristband.entity';
import { Playground } from '../../playgrounds/entities/playground.entity';

@Entity()
export class WristbandDetail {
  @PrimaryGeneratedColumn({ name: 'wbdt_id' })
  id: number;

  @Column({ name: 'wbdt_name' })
  namePlay: string;

  @Column({ name: 'wbdt_sum' })
  sum: number;

  @Column({ name: 'wbdt_rate' })
  rate: number;

  @Column({ name: 'wbdt_review' })
  review: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Wristband, (wristband) => wristband.wristband_detail)
  wristband: Wristband;

  @ManyToOne(() => Playground, (playground) => playground.wristband_detail)
  playground: Playground;
}
