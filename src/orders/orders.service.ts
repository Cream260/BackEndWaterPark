/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
  ) {}
  create(createOrderDto: CreateOrderDto) {
    return this.OrderRepository.save(createOrderDto);
  }

  findAll() {
    return this.OrderRepository.find();
  }

  async findOne(id: number) {
    const Order = await this.OrderRepository.findOneBy({ id: id });
    if (!Order) {
      throw new NotFoundException('Order not found');
    } else {
      return Order;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const Order = await this.OrderRepository.findOneBy({ id: id });
    if (!Order) {
      throw new NotFoundException('Order not found');
    }
    return await this.OrderRepository.save({
      ...Order,
      ...updateOrderDto,
    });
  }

  async remove(id: number) {
    const Order = await this.OrderRepository.findOneBy({ id: id });
    if (!Order) {
      throw new NotFoundException('Order not found');
    }
    return this.OrderRepository.softRemove(Order);
  }
}
