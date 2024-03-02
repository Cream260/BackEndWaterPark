import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { PackageDetail } from '../../package_details/entities/package_detail.entity';
import { Order } from '../../orders/entities/order.entity';

@Entity()
export class Package {
  @PrimaryGeneratedColumn({ name: 'package_id' })
  id: number;

  @Column({ length: '50', name: 'package_name' })
  name: string;

  @Column({ type: 'float', name: 'package_price' })
  price: number;

  @Column({ name: 'package_qty' })
  qty: number;

  @Column({ length: 500, name: 'package_image' })
  images: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToMany(() => PackageDetail, (package_detail) => package_detail.package)
  package_detail: PackageDetail[];

  @OneToMany(() => Order, (order) => order.package)
  orders: Order[];
}
