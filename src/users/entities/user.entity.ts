import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Customer } from '../../customers/entities/customer.entity';
import { Employee } from '../../employees/entities/employee.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: number;

  @Column({ name: 'user_email' })
  email: string;

  @Column({ name: 'user_username', unique: true })
  username: string;

  @Column({ name: 'user_password' })
  password: string;

  @Column({ length: '50', name: 'user_name' })
  name: string;

  @Column({ name: 'user_tel' })
  tel: string;

  @Column({ name: 'user_role' })
  role: string;

  @OneToOne(() => Customer, (customer) => customer.user, { nullable: true })
  customer: Customer | null;

  @OneToOne(() => Employee, (employee) => employee.user, { nullable: true })
  employee: Employee | null;
}
