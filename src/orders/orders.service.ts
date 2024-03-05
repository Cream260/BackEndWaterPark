/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Repository } from 'typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { OrderItem } from './entities/order-item';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { Package } from '../package/entities/package.entity';
import { Wristband } from '../wristbands/entities/wristband.entity';
import { QrService } from '../qr.service';
import { Event } from '../event/entities/event.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private ordersRepository: Repository<Order>,
    @InjectRepository(Customer)
    private customersRepository: Repository<Customer>,
    @InjectRepository(Ticket)
    private ticketsRepository: Repository<Ticket>,
    @InjectRepository(OrderItem)
    private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Promotion)
    private promotionsRepository: Repository<Promotion>,
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    @InjectRepository(Wristband)
    private wristbandRepository: Repository<Wristband>,
    private qrService: QrService,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const customer = await this.customersRepository.findOneBy({
      id: createOrderDto.cusID,
    });
    const promotion = await this.promotionsRepository.findOneBy({
      id: createOrderDto.promoId,
    });
    const event_ = await this.eventRepository.findOneBy({
      id: createOrderDto.eventId,
    });
    const package_ = await this.packageRepository.findOne({
      where: { id: createOrderDto.packageId },
      relations: ['package_detail'],
    });

    const order: Order = new Order();
    order.qty = 0;
    order.totalPrice = 0;
    order.numPeople = createOrderDto.numPeople;
    order.nameComp = createOrderDto.nameComp;
    order.received = createOrderDto.received;
    order.payments = createOrderDto.payments;
    order.startDate = createOrderDto.startDate;
    order.expDate = createOrderDto.expDate;
    order.customer = customer;
    order.promotion = promotion;
    order.event = event_;
    order.package = package_;
    order.discount = 0;

    if (createOrderDto.promoId) {
      order.discount = order.promotion.discount;
    }

    if (createOrderDto.eventId) {
      order.totalPrice = event_.price * order.numPeople;
      order.qty = order.numPeople;
      order.netPrice = order.totalPrice;
    }

    if (createOrderDto.packageId) {
      order.totalPrice = package_.price;
      order.qty = package_.qty;
      order.netPrice = package_.price;
    }

    await this.ordersRepository.save(order);

    for (const od of createOrderDto.orderItems) {
      const orderItem = new OrderItem();
      orderItem.qty = od.qty;
      orderItem.ticket = await this.ticketsRepository.findOneBy({
        id: od.ticketId,
      });
      orderItem.name = orderItem.ticket.name;
      orderItem.type = orderItem.ticket.type;
      orderItem.price = orderItem.ticket.price;
      orderItem.totalPrice = orderItem.price * orderItem.qty;
      orderItem.orders = order;
      await this.orderItemsRepository.save(orderItem);
      order.qty = order.qty + orderItem.qty; //บวกจำนวนทั้งหมดของ order
      order.totalPrice = order.totalPrice + orderItem.totalPrice; //บวกราคาทั้งหมดของ order
      order.netPrice = order.totalPrice - order.discount;

      for (let i = 0; i < orderItem.qty; i++) {
        const wristband = new Wristband();
        wristband.type = orderItem.name;
        wristband.startDate = order.startDate;
        wristband.endDate = order.expDate;
        wristband.orders = order;
        await this.wristbandRepository.save(wristband);
      }
    }

    if (createOrderDto.eventId) {
      for (let i = 0; i < order.qty; i++) {
        const wristband = new Wristband();
        wristband.type = 'อีเว้นท์';
        wristband.startDate = order.startDate;
        wristband.endDate = order.expDate;
        wristband.orders = order;
        await this.wristbandRepository.save(wristband);
      }
    }
    if (createOrderDto.packageId) {
      console.log(package_.package_detail);
      for (const pk of package_.package_detail) {
        for (let i = 0; i < pk.qty; i++) {
          const wristband = new Wristband();
          wristband.type = pk.name;
          console.log(pk.name);
          wristband.startDate = order.startDate;
          wristband.endDate = order.expDate;
          wristband.orders = order;
          await this.wristbandRepository.save(wristband);
        }
      }
    }

    await this.ordersRepository.save(order);
    return await this.ordersRepository.findOne({
      where: { id: order.id },
      relations: ['orderItems', 'customer', 'orderItems.ticket'],
    });
  }

  findAll() {
    return this.ordersRepository.find({
      relations: ['customer', 'orderItems', 'orderItems.ticket', 'wristband'],
    });
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: ['customer', 'orderItems', 'orderItems.ticket', 'wristband'],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    } else {
      return order;
    }
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.ordersRepository.findOneBy({ id: id });
    if (!order) {
      throw new NotFoundException('Order not found');
    }
    return await this.ordersRepository.save({
      ...order,
      ...updateOrderDto,
    });
  }

  async remove(id: number) {
    const order = await this.ordersRepository.findOneBy({ id: id });
    return this.ordersRepository.softRemove(order);
  }

  async generateQrCodeForOrder(link: string): Promise<string> {
    try {
      return await this.qrService.generateQr(link);
    } catch (error) {
      console.error('Failed to generate QR code for order:', error);
      throw new Error('Failed to generate QR code for order');
    }
  }
}
