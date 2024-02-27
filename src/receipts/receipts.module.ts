import { Module } from '@nestjs/common';
import { ReceiptsService } from './receipts.service';
import { ReceiptsController } from './receipts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './entities/receipt.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Promotion } from '../promotions/entities/promotion.entity';
import { Order } from '../orders/entities/order.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
import { Package } from '../package/entities/package.entity';
import { Event } from '../event/entities/event.entity';
import { Wristband } from '../wristbands/entities/wristband.entity';
import { WristbandDetail } from '../wristband_details/entities/wristband_detail.entity';
import { Playground } from '../playgrounds/entities/playground.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Receipt,
      Customer,
      Promotion,
      Order,
      Ticket,
      Package,
      Event,
      Wristband,
      WristbandDetail,
      Playground,
    ]),
  ],
  controllers: [ReceiptsController],
  providers: [ReceiptsService],
})
export class ReceiptsModule {}
