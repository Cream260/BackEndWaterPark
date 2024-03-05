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
    const order = new Order();
    order.qty = createOrderDto.qty;
    order.received = createOrderDto.received;

    //CHECK CUSTOMER is null
    if (createOrderDto.cusID) {
      const customer = await this.customersRepository.findOne({
        where: { id: createOrderDto.cusID },
      });
      if (!customer) {
        throw new NotFoundException('Customer not found');
      }
      order.customer = customer;

      //CHECK event is null
      if (createOrderDto.eventId) {
        const event = await this.eventRepository.findOne({
          where: { id: createOrderDto.eventId },
        });
        if (!event) {
          throw new NotFoundException('Event not found');
        }
        //calculate total price from event
        let totalPrice = 0;
        //coutn from qty
        if (createOrderDto.qty) {
          totalPrice = event.price * createOrderDto.qty;
        }
        //set totalPrice
        order.event = event;
        order.totalPrice = totalPrice;
        //startDate
        order.startDate = createOrderDto.startDate;
        //expDate
        //set expDate next year
        const expDate = new Date(createOrderDto.expDate);
        // Then, set expDate to one year ahead
        expDate.setFullYear(expDate.getFullYear() + 1);
        order.expDate = new Date(expDate);
        order.netPrice = totalPrice;
        //create wristbacnd
        //save order data
        const orderSave = await this.ordersRepository.save(order);
        //create wristband
        for (let i = 0; i < createOrderDto.qty; i++) {
          const wristband = new Wristband();
          wristband.orders = orderSave;
          wristband.startDate = createOrderDto.startDate;
          wristband.endDate = createOrderDto.expDate;

          wristband.type = 'event';

          await this.wristbandRepository.save(wristband);
        }
        return this.ordersRepository.findOne({
          where: { id: orderSave.id },
          relations: [
            'customer',
            'orderItems',
            'orderItems.ticket',
            'wristband',
            'event',
          ],
        });
      }
      // check package is null
      if (createOrderDto.packageId) {
        const packageData = await this.packageRepository.findOne({
          where: { id: createOrderDto.packageId },
        });
        if (!packageData) {
          throw new NotFoundException('Package not found');
        }
        //calculate total price from package

        order.totalPrice = packageData.price;
        order.netPrice = packageData.price;
        //create wristbacnd
        //save order data
        const orderSave = await this.ordersRepository.save(order);
        //create wristband
        for (let i = 0; i < createOrderDto.qty; i++) {
          const wristband = new Wristband();
          wristband.orders = orderSave;
          wristband.startDate = createOrderDto.startDate;
          wristband.endDate = createOrderDto.expDate;

          wristband.type = 'package';

          await this.wristbandRepository.save(wristband);
        }
        return this.ordersRepository.findOne({
          where: { id: orderSave.id },
          relations: [
            'customer',
            'orderItems',
            'orderItems.ticket',
            'wristband',
            'event',
          ],
        });
      }
      //check tiket fro orderItem
      if (createOrderDto.orderItems) {
        //create order
        const order = new Order();
        order.qty = createOrderDto.qty;
        order.received = createOrderDto.received;
        order.customer = customer;
        order.startDate = createOrderDto.startDate;
        order.expDate = createOrderDto.expDate;

        let totalPrice = 0;
        for (let i = 0; i < createOrderDto.orderItems.length; i++) {
          //find ticket
          const ticket = await this.ticketsRepository.findOne({
            where: { id: createOrderDto.orderItems[i].ticketId },
          });
          totalPrice += ticket.price * createOrderDto.orderItems[i].qty;
        }
        order.totalPrice = totalPrice;
        order.netPrice = totalPrice;
        const orderSave = await this.ordersRepository.save(order);
        for (let i = 0; i < createOrderDto.orderItems.length; i++) {
          const orderItem = new OrderItem();
          const ticket = await this.ticketsRepository.findOne({
            where: { id: createOrderDto.orderItems[i].ticketId },
          });
          if (!ticket) {
            throw new NotFoundException('Ticket not found');
          }
          orderItem.ticket = ticket;
          orderItem.qty = createOrderDto.orderItems[i].qty;
          orderItem.price = createOrderDto.orderItems[i].price;
          orderItem.totalPrice = createOrderDto.orderItems[i].totalPrice;
          orderItem.type = createOrderDto.orderItems[i].type;
          orderItem.orders = orderSave;
          await this.orderItemsRepository.save(orderItem);
          // create wristband
          for (let i = 0; i < createOrderDto.orderItems[i].qty; i++) {
            const wristband = new Wristband();
            wristband.orders = orderSave;
            wristband.startDate = createOrderDto.startDate;
            wristband.endDate = createOrderDto.expDate;
            wristband.type = 'ticket';
            await this.wristbandRepository.save(wristband);
          }
        }
        return this.ordersRepository.findOne({
          where: { id: orderSave.id },
          relations: [
            'customer',
            'orderItems',
            'orderItems.ticket',
            'wristband',
            'event',
          ],
        });
      }
    }
  }

  findAll() {
    return this.ordersRepository.find({
      relations: ['customer', 'orderItems', 'orderItems.ticket', 'wristband'],
    });
  }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: [
        'customer',
        'orderItems',
        'orderItems.ticket',
        'wristband',
        'event',
      ],
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
