import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { Receipt } from '../receipts/entities/receipt.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Order, Receipt, Ticket])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
