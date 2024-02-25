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

  @Column({ name: 'wbdt_sum' })
  sum: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Wristband, (wristband) => wristband.wristbandDetail)
  wristband: Wristband;

  @ManyToOne(() => Playground, (playground) => playground.wristbandDetail)
  playground: Playground;
}
