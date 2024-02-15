/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}
  create(createCustomerDto: CreateCustomerDto) {
    return this.customerRepository.save(createCustomerDto);
  }

  findAll() {
    return this.customerRepository.find();
  }

  async findOne(id: number) {
    const Customer = await this.customerRepository.findOneBy({ id: id });
    if (!Customer) {
      throw new NotFoundException('Customer not found');
    } else {
      return Customer;
    }
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const Customer = await this.customerRepository.findOneBy({ id: id });
    if (!Customer) {
      throw new NotFoundException('Customer not found');
    }
    return await this.customerRepository.save({
      ...Customer,
      ...updateCustomerDto,
    });
  }

  async remove(id: number) {
    const Customer = await this.customerRepository.findOneBy({ id: id });
    if (!Customer) {
      throw new NotFoundException('Customer not found');
    }
    return this.customerRepository.softRemove(Customer);
  }
}
