import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn({ name: 'cus_id' })
  id: number;

  @Column({ length: '50', name: 'cus_name' })
  name: string;

  @Column({ length: '50', name: 'cus_email' })
  email: string;

  @Column({ unique: true, name: 'cus_tel' })
  tel: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;
}
