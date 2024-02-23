import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './event/entities/event.entity';
import { Promotion } from './promotions/entities/promotion.entity';
import { Package } from './package/entities/package.entity';
import { Ticket } from './ticket/entities/ticket.entity';
import { Customer } from './customers/entities/customer.entity';
import { PromotionsModule } from './promotions/promotions.module';
import { EventModule } from './event/event.module';
import { PackageModule } from './package/package.module';
import { TicketModule } from './ticket/ticket.module';
import { CustomersModule } from './customers/customers.module';
import { OrdersModule } from './orders/orders.module';
import { Order } from './orders/entities/order.entity';
import { ReceiptsModule } from './receipts/receipts.module';
import { Receipt } from './receipts/entities/receipt.entity';
import { WristbandsModule } from './wristbands/wristbands.module';
import { Wristband } from './wristbands/entities/wristband.entity';
import { WristbandDetailsModule } from './wristband_details/wristband_details.module';
import { WristbandDetail } from './wristband_details/entities/wristband_detail.entity';

@Module({
  imports: [
    PromotionsModule,
    EventModule,
    PackageModule,
    TicketModule,
    CustomersModule,
    WristbandsModule,
    WristbandDetailsModule,
    OrdersModule,
    ReceiptsModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'waterpark',
      entities: [Promotion, Event, Package, Ticket, Customer, Order, Receipt, Wristband, WristbandDetail],
      synchronize: true,
    }),
    WristbandsModule,
    WristbandDetailsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
