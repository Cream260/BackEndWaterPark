import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Customer } from '../customers/entities/customer.entity';
import { Package } from '../package/entities/package.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Wristband } from '../wristbands/entities/wristband.entity';
import { Event } from '../event/entities/event.entity';
import { QrService } from '../qr.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      OrderItem,
      Customer,
      Promotion,
      Ticket,
      Package,
      Event,
      Wristband,
    ]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService, QrService],
})
export class OrdersModule {}
