import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Package {
  @PrimaryGeneratedColumn({ name: 'package_id' })
  id: number;

  @Column({ length: '50', name: 'package_name' })
  name: string;

  @Column({ length: '100', name: 'package_detail' })
  detail: string;

  @Column({type: 'float', name: 'package_price' })
  price: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}