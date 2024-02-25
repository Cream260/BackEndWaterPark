import { Module } from '@nestjs/common';
import { WristbandsService } from './wristbands.service';
import { WristbandsController } from './wristbands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wristband } from './entities/wristband.entity';
import { Receipt } from '../receipts/entities/receipt.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Wristband, Receipt])],
  controllers: [WristbandsController],
  providers: [WristbandsService],
})
export class WristbandsModule {}
