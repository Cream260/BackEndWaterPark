/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}
  create(createEmployeeDto: CreateEmployeeDto) {
    return this.employeeRepository.save(createEmployeeDto);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  async findOne(id: number) {
    const emp = await this.employeeRepository.findOneBy({ id: id });
    if (!emp) {
      throw new NotFoundException('Employee not found');
    } else {
      return emp;
    }
  }

  async update(id: number, updateEmployeeDto: UpdateEmployeeDto) {
    const emp = await this.employeeRepository.findOneBy({ id: id });
    if (!emp) {
      throw new NotFoundException('Employee not found');
    }
    return await this.employeeRepository.save({
      ...emp,
      ...updateEmployeeDto,
    });
  }

  async remove(id: number) {
    const emp = await this.employeeRepository.findOneBy({ id: id });
    if (!emp) {
      throw new NotFoundException('Employee not found');
    }
    return this.employeeRepository.softRemove(emp);
  }
}
