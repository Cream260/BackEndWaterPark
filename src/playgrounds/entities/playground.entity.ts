import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class Playground {
  @PrimaryGeneratedColumn({ name: 'play_id' })
  id: number;

  @Column({ name: 'play_name' })
  name: string;

  @Column({
    length: '128',
    default: 'no_image.jpg',
  })
  image: string;

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

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Review, (review) => review.playground)
  review: Review[];
}
