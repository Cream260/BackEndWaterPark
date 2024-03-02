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
import { Wristband } from '../wristbands/entities/wristband.entity';

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
    @InjectRepository(Wristband)
    private WristbandRepository: Repository<Wristband>,
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
    const packages = await this.PackageRepository.findOne({
      where: { id: createReceiptDto.packageId },
      relations: ['package_detail'],
    });

    const receipt: Receipt = new Receipt();
    receipt.qty = 0;
    receipt.totalPrice = 0;
    receipt.numPeople = createReceiptDto.numPeople;
    receipt.nameComp = createReceiptDto.nameComp;
    receipt.received = createReceiptDto.received;
    receipt.payments = createReceiptDto.payments;
    receipt.startDate = createReceiptDto.startDate;
    receipt.expDate = createReceiptDto.expDate;
    receipt.customer = customer;
    receipt.promotion = promotion;
    receipt.event = event;
    receipt.package = packages;

    if (receipt.promotion != null) {
      receipt.discount = receipt.promotion.discount;
    }

    if (receipt.event != null) {
      receipt.totalPrice = receipt.event.price * receipt.numPeople;
      receipt.qty = receipt.numPeople;
      receipt.netPrice = receipt.totalPrice;
    }

    if (receipt.package != null) {
      receipt.totalPrice = receipt.package.price;
      receipt.qty = receipt.package.qty;
      receipt.netPrice = receipt.package.price;
    }
    await this.ReceiptRepository.save(receipt);

    for (const orderItem of createReceiptDto.order) {
      const whereClause: any = { name: orderItem.name };
      if (orderItem.type) {
        whereClause.type = orderItem.type; // check type ว่านอกจาก name แล้ว type ยังตรงไหม
      }
      const ticket = await this.TicketRepository.findOne({
        where: whereClause,
        relations: ['order'],
      });

      if (ticket) {
        // console.log('found ticket');
        const order = new Order();
        order.name = orderItem.name;
        order.type = orderItem.type;
        order.price = orderItem.price;
        order.totalPrice = orderItem.totalPrice;
        order.qty = orderItem.qty;
        order.ticket = ticket;
        order.receipt = receipt;
        await this.OrderRepository.save(order);
        receipt.qty = receipt.qty + order.qty; //บวกจำนวนทั้งหมดของ order
        receipt.totalPrice = receipt.totalPrice + order.totalPrice; //บวกราคาทั้งหมดของ order
        receipt.netPrice = receipt.totalPrice - receipt.promotion.discount;

        for (let i = 0; i < order.qty; i++) {
          const wristband = new Wristband();
          wristband.type = order.name;
          wristband.startDate = receipt.startDate;
          wristband.endDate = receipt.expDate;
          wristband.receipt = receipt;
          await this.WristbandRepository.save(wristband);
        }
      }
    }
    if (receipt.event != null) {
      for (let i = 0; i < receipt.qty; i++) {
        const wristband = new Wristband();
        wristband.type = 'อีเว้นท์';
        wristband.startDate = receipt.startDate;
        wristband.endDate = receipt.expDate;
        wristband.receipt = receipt;
        await this.WristbandRepository.save(wristband);
      }
    }
    if (receipt.package != null) {
      console.log(packages.package_detail);
      for (const pk of packages.package_detail) {
        for (let i = 0; i < pk.qty; i++) {
          const wristband = new Wristband();
          wristband.type = pk.name;
          console.log(pk.name);
          wristband.startDate = receipt.startDate;
          wristband.endDate = receipt.expDate;
          wristband.receipt = receipt;
          await this.WristbandRepository.save(wristband);
        }
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
        'package.package_detail',
        'order',
        'order.ticket',
        'wristband',
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
        'package.package_detail',
        'order',
        'order.ticket',
        'wristband',
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
