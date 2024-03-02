import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { WristbandDetail } from '../../wristband_details/entities/wristband_detail.entity';

@Entity()
export class Playground {
  @PrimaryGeneratedColumn({ name: 'play_id' })
  id: number;

  @Column({ name: 'play_name' })
  name: string;

  @Column({ name: 'play_type' })
  type: string;

  @Column({ name: 'play_status' })
  status: string;

  @Column()
  installDate: Date;

  @Column({ type: 'float', name: 'play_price' })
  price: number;

  @Column({ name: 'play_condition' })
  condition: string;

  @Column({ length: 500, name: 'play_image' })
  images: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(
    () => WristbandDetail,
    (wristbandDetail) => wristbandDetail.playground,
  )
  wristband_detail: WristbandDetail[];
}
