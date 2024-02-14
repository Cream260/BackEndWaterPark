import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Promotion {
  @PrimaryGeneratedColumn({ name: 'promo_id' })
  id: number;

  @Column({ length: '50', name: 'promo_name' })
  name: string;

  @Column({ length: '50', name: 'promo_code' })
  code: string;

  @Column({ length: '100', name: 'promo_details' })
  detail: string;

  @Column({ name: 'promo_startDate' })
  startDate: Date;

  @Column({ name: 'promo_endDate' })
  endDate: Date;

  @Column({ type: 'float', name: 'promo_discount' })
  discount: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
