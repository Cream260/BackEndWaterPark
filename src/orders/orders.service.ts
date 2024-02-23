/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Receipt } from '../receipts/entities/receipt.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
    @InjectRepository(Receipt)
    private ReceiptRepository: Repository<Receipt>,
    @InjectRepository(Ticket)
    private TicketRepository: Repository<Ticket>,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const receipt = await this.ReceiptRepository.findOneBy({
      id: createOrderDto.recID,
    });
    const ticket = await this.TicketRepository.findOneBy({
      id: createOrderDto.ticketID,
    });
    const customer = await this.ReceiptRepository.findOne({
      // relations: ['order', 'order.receipt', 'order.ticket'],
      where: {
        order: { receipt: { id: createOrderDto.recID } },
      },
    });
    const promotion = await this.ReceiptRepository.findOne({
      // relations: ['order', 'order.receipt', 'order.ticket'],
      where: {
        order: { receipt: { id: createOrderDto.recID } },
      },
    });
    const order: Order = new Order();
    order.name = createOrderDto.name;
    order.price = createOrderDto.price;
    order.totalPrice = createOrderDto.totalPrice;
    order.qty = createOrderDto.qty;
    order.startDate = createOrderDto.startDate;
    order.endDate = createOrderDto.endDate;
    order.receipt = receipt;
    order.ticket = ticket;
    // order.receipt = customer;
    // order.receipt = promotion;
    return this.OrderRepository.save(order);
  }

  findAll() {
    return this.OrderRepository.find({
      relations: ['receipt', 'ticket', 'receipt.customer', 'receipt.promotion'],
    });
  }

  async findOne(id: number) {
    const Order = await this.OrderRepository.findOne({
      where: { id: id },
      relations: ['receipt', 'ticket', 'receipt.customer', 'receipt.promotion'],
    });
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
