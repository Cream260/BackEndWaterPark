/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from './entities/receipt.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { Order } from '../orders/entities/order.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Event } from '../event/entities/event.entity';
import { Package } from '../package/entities/package.entity';
import { EventService } from '../event/event.service';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private ReceiptRepository: Repository<Receipt>,
    @InjectRepository(Customer)
    private CustomerRepository: Repository<Customer>,
    @InjectRepository(Promotion)
    private PromotionRepository: Repository<Promotion>,
    @InjectRepository(Order)
    private OrderRepository: Repository<Order>,
    @InjectRepository(Ticket)
    private TicketRepository: Repository<Ticket>,
    @InjectRepository(Event)
    private EventRepository: Repository<Event>,
    @InjectRepository(Package)
    private PackageRepository: Repository<Package>,
  ) {}
  async create(createReceiptDto: CreateReceiptDto) {
    const customer = await this.CustomerRepository.findOneBy({
      id: createReceiptDto.cusID,
    });
    const promotion = await this.PromotionRepository.findOneBy({
      id: createReceiptDto.promoId,
    });
    const event = await this.EventRepository.findOneBy({
      id: createReceiptDto.eventId,
    });
    const packages = await this.PackageRepository.findOneBy({
      id: createReceiptDto.packageId,
    });
    const receipt: Receipt = new Receipt();
    receipt.qty = createReceiptDto.qty;
    receipt.totalPrice = createReceiptDto.totalPrice;
    receipt.netPrice = createReceiptDto.totalPrice - createReceiptDto.discount;
    receipt.numPeople = createReceiptDto.numPeople;
    receipt.nameComp = createReceiptDto.nameComp;
    receipt.discount = createReceiptDto.discount;
    receipt.received = createReceiptDto.received;
    receipt.payments = createReceiptDto.payments;
    receipt.startDare = createReceiptDto.startDare;
    receipt.expDate = createReceiptDto.expDate;
    receipt.customer = customer;
    receipt.promotion = promotion;
    receipt.event = event;
    receipt.package = packages;

    // if (createReceiptDto.numPeople > 0) {
    //   // check ว่า numPeople มากกว่า 0 แสดงว่าเป็น event
    //   const event = await this.EventRepository.findOneBy({
    //     name: createReceiptDto.name, //find receipts name ชื่อเหมือน event ไหน
    //   });
    //   if (event) {
    //     //find event
    //     receipt.name = event.name;
    //     receipt.totalPrice = event.price;
    //     receipt.event = event;
    //   }
    // } else if (
    //   createReceiptDto.name != null &&
    //   createReceiptDto.numPeople == null
    // ) {
    //   // check ว่า name ไม่เท่ากับ null และ numPeople เท่ากับ null
    //   const packages = await this.PackageRepository.findOneBy({
    //     name: createReceiptDto.name, //find receipts name ชื่อเหมือน package ไหน
    //   });
    //   if (packages) {
    //     //find packages
    //     receipt.name = packages.name;
    //     receipt.totalPrice = packages.price;
    //     receipt.package = packages;
    //   }
    // }
    await this.ReceiptRepository.save(receipt);

    for (const orderItem of createReceiptDto.order) {
      const ticket = await this.TicketRepository.findOne({
        where: { name: orderItem.name },
        relations: ['order'],
      });

      if (ticket) {
        console.log('found ticket');
        const order = new Order();
        order.name = orderItem.name;
        order.type = orderItem.type;
        order.price = orderItem.price;
        order.totalPrice = orderItem.totalPrice;
        order.qty = orderItem.qty;
        order.startDate = orderItem.startDate;
        order.endDate = orderItem.endDate;
        order.ticket = ticket;
        await this.OrderRepository.save(order);
        receipt.startDare = orderItem.startDate;
        receipt.expDate = orderItem.endDate;
      }
    }
    await this.ReceiptRepository.save(receipt);
    return await this.ReceiptRepository.findOne({
      where: { id: receipt.id },
      relations: ['order'],
    });
  }

  findAll() {
    return this.ReceiptRepository.find({
      relations: [
        'customer',
        'promotion',
        'event',
        'package',
        'order',
        'order.ticket',
      ],
    });
  }

  async findOne(id: number) {
    const Receipt = await this.ReceiptRepository.findOne({
      where: { id: id },
      relations: [
        'customer',
        'promotion',
        'event',
        'package',
        'order',
        'order.ticket',
      ],
    });
    if (!Receipt) {
      throw new NotFoundException('Receipt not found');
    } else {
      return Receipt;
    }
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    // const Receipt = await this.ReceiptRepository.findOneBy({ id: id });
    // if (!Receipt) {
    //   throw new NotFoundException('Receipt not found');
    // }
    // return await this.ReceiptRepository.save({
    //   ...Receipt,
    //   ...updateReceiptDto,
    // });
    let tk = new Ticket();
    for (const or of updateReceiptDto.order) {
      const ticket = await this.TicketRepository.findOne({
        where: { name: or.name },
        relations: ['order'],
      });
      console.log(ticket);
      if (ticket) {
        tk = ticket;
        tk.price = or.price + ticket.price;
        await this.TicketRepository.save(tk);
      } else {
      }
    }
    return {
      status: 'success',
    };
  }

  async remove(id: number) {
    const Receipt = await this.ReceiptRepository.findOne({
      where: { id: id },
    });
    if (!Receipt) {
      throw new NotFoundException('Receipt not found');
    } else {
      await this.ReceiptRepository.softRemove(Receipt);
    }
    return Receipt;
  }
}
