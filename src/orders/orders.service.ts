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
        order.nameComp = createOrderDto.nameComp;
        order.numPeople = createOrderDto.numPeople;
        //expDate
        //set expDate next year
        const expDate = new Date(createOrderDto.expDate);
        const startDate = new Date(createOrderDto.startDate);
        const day = startDate.getDate();
        const month = startDate.getMonth();
        // Then, set expDate to one year ahead
        expDate.setFullYear(expDate.getFullYear() + 1);
        expDate.setDate(day);
        expDate.setMonth(month);
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
            'package',
          ],
        });
      }
      // check package is null
      if (createOrderDto.packageId) {
        const packageData = await this.packageRepository.findOne({
          where: { id: createOrderDto.packageId },
          relations: ['package_detail'],
        });
        if (!packageData) {
          throw new NotFoundException('Package not found');
        }
        //calculate total price from package

        order.totalPrice = packageData.price;
        order.netPrice = packageData.price;
        order.package = packageData;
        order.startDate = createOrderDto.startDate;
        order.expDate = createOrderDto.expDate;
        order.received = createOrderDto.received;
        order.payments = createOrderDto.payments;
        order.qty = packageData.qty;
        //create wristbacnd
        //save order data
        const orderSave = await this.ordersRepository.save(order);
        //create wristband
        for (let i = 0; i < createOrderDto.qty; i++) {
          const wristband = new Wristband();
          wristband.orders = orderSave;
          wristband.startDate = createOrderDto.startDate;
          wristband.endDate = createOrderDto.expDate;

          if (
            packageData.package_detail &&
            packageData.package_detail.length > 0
          ) {
            wristband.type = packageData.package_detail[0].type; // Assuming there's only one package detail per package
          } else {
            wristband.type = 'บัตรผู้ใหญ่'; // Default value if no package details found
          }

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
            'package',
            'package.package_detail',
          ],
        });
      }
      //check tiket fro orderItem
      if (createOrderDto.orderItems) {
        //create order
        const order = new Order();
        order.qty = 0;
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
        if (createOrderDto.promoId) {
          const promotion = await this.promotionsRepository.findOne({
            where: { id: createOrderDto.promoId },
          });
          if (!promotion) {
            throw new NotFoundException('Promotion not found');
          }
          const netPrice = order.totalPrice - promotion.discount;
          // กำหนดค่า netPrice ให้กับ order
          order.netPrice = netPrice;
          // ...ต่อไปจากนั้นสร้าง OrderItem และ Wristband ตามปกติ
        } else {
          // ถ้าไม่มีโปรโมชั่นก็ให้ใช้ราคาเดิม
          order.netPrice = order.totalPrice;
          // ...ต่อไปจากนั้นสร้าง OrderItem และ Wristband ตามปกติ
        }
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
          orderItem.name = createOrderDto.orderItems[i].name;
          orderItem.qty = createOrderDto.orderItems[i].qty;
          orderItem.price = createOrderDto.orderItems[i].price;
          orderItem.totalPrice = createOrderDto.orderItems[i].totalPrice;
          orderItem.type = createOrderDto.orderItems[i].type;
          orderItem.orders = orderSave;
          await this.orderItemsRepository.save(orderItem);
          order.qty = order.qty + orderItem.qty;

          await this.ordersRepository.save(order);
          // create wristband
          for (let i = 0; i < orderItem.qty; i++) {
            const wristband = new Wristband();
            wristband.orders = orderSave;
            wristband.startDate = createOrderDto.startDate;
            wristband.endDate = createOrderDto.expDate;
            wristband.type = orderItem.name;
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
            'package',
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

  // async findOne(id: number) {
  //   const order = await this.ordersRepository.findOne({
  //     where: { id: id },
  //     relations: [
  //       'customer',
  //       'orderItems',
  //       'orderItems.ticket',
  //       'wristband',
  //       'event',
  //       'package',
  //     ],
  //   });
  //   if (!order) {
  //     throw new NotFoundException('Order not found');
  //   } else {
  //     return order;
  //   }
  // }

  async findOne(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: [
        'customer',
        'orderItems',
        'orderItems.ticket',
        'wristband',
        'event',
        'package',
        'package.package_detail',
      ],
    });
    if (!order) {
      throw new NotFoundException('Order not found');
    } else {
      // ดึงข้อมูล id ของแต่ละส่วนแล้วใส่ใน object order
      const customerIds = order.customer ? order.customer.id : null;
      const orderItemIds = order.orderItems
        ? order.orderItems.map((item) => item.id)
        : [];
      const ticketIds = order.orderItems
        ? order.orderItems.map((item) => (item.ticket ? item.ticket.id : null))
        : [];
      const wristbandIds = order.wristband ? order.wristband : null;
      const eventId = order.event ? order.event.id : null;
      const packageId = order.package ? order.package.id : null;

      // เพิ่มข้อมูล id ของแต่ละส่วนลงใน object order
      return {
        ...order,
        customerIds,
        orderItemIds,
        ticketIds,
        wristbandIds,
        eventId,
        packageId,
      };
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

  async findPackageByOrder(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: ['package'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    } else if (!order.package) {
      throw new NotFoundException('Order package not found');
      // ไม่มี Package ID ใน Order จึงไม่ต้องแสดงข้อมูลของ Package คืนค่า null หรือข้อมูลที่เหมาะสมตามที่ต้องการ
      return null; // หรือคืนค่าอื่น ๆ ที่คุณต้องการ
    } else {
      return order.package.id;
    }
  }

  async findEventByOrder(id: number) {
    const order = await this.ordersRepository.findOne({
      where: { id: id },
      relations: ['event'],
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    } else if (!order.event) {
      throw new NotFoundException('Order event not found');
      // ไม่มี Event ใน Order จึงไม่ต้องดึงข้อมูลของ Event คืนค่า null หรือข้อมูลที่เหมาะสมตามที่ต้องการ
      return null; // หรือคืนค่าอื่น ๆ ที่คุณต้องการ
    } else {
      return order.event.id;
    }
  }
}
