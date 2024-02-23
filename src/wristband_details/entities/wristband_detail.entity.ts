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

  // @OneToMany(() => PlayGround, (playGround) => playGround.wristbandDetail)
  // playGround: PlayFround[];
}
