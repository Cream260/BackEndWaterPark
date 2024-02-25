import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Package } from '../../package/entities/package.entity';
import { Ticket } from '../../ticket/entities/ticket.entity';

@Entity()
export class PackageDetail {
  @PrimaryGeneratedColumn({ name: 'packageDt_id' })
  id: number;

  @Column({ name: 'packageDt_name' })
  name: string;

  @Column({ name: 'packageDt_type' })
  type: string;

  @Column({ name: 'packageDt_qty' })
  qty: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @ManyToOne(() => Package, (package_ticket) => package_ticket.package_detail)
  package: Package;

  @ManyToOne(() => Ticket, (ticket) => ticket.package_detail)
  ticket: Ticket;
}
