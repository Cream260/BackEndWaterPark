import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Playground } from '../../playgrounds/entities/playground.entity';
import { Wristband } from '../../wristbands/entities/wristband.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn({ name: 'review_id' })
  id: number;

  @Column({ name: 'review_namePlay' })
  name: string;

  @Column({ name: 'review_rate' })
  rate: number;

  @Column({ name: 'review_text' })
  text: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Wristband, (wristband) => wristband.review)
  wristband: Wristband;

  @ManyToOne(() => Playground, (playground) => playground.review)
  playground: Playground;
}
