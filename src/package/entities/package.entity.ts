import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Receipt } from '../../receipts/entities/receipt.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn({ name: 'package_id' })
  id: number;

  @Column({ length: '50', name: 'package_name' })
  name: string;

  // @Column({ length: '100', name: 'package_detail' })
  // detail: string;

  @Column({ type: 'float', name: 'package_price' })
  price: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => Receipt, (receipt) => receipt.package)
  receipt: Receipt[];
}
