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

@Module({
  imports: [
    PromotionsModule,
    EventModule,
    PackageModule,
    TicketModule,
    CustomersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'waterpark',
      entities: [Promotion, Event, Package, Ticket, Customer],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
