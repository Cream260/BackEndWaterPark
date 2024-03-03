import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn({ name: 'emp_id' })
  id: number;

  @Column({ length: '64', name: 'emp_name' })
  name: string;

  @Column({ name: 'emp_email', unique: true })
  email: string;

  @Column({ name: 'emp_tel' })
  tel: string;

  @Column({ name: 'emp_address' })
  address: string;

  @Column({ name: 'emp_position' })
  position: string;

  @Column({ name: 'emp_hourly_wage' })
  hourly: number;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedDate: Date;

  @OneToOne(() => User, (user) => user.employee)
  @JoinColumn()
  user: User;
}
