import { Module } from '@nestjs/common';
import { WristbandsService } from './wristbands.service';
import { WristbandsController } from './wristbands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wristband } from './entities/wristband.entity';
import { Receipt } from '../receipts/entities/receipt.entity';
import { WristbandDetail } from '../wristband_details/entities/wristband_detail.entity';
import { Playground } from '../playgrounds/entities/playground.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Wristband,
      Receipt,
      WristbandDetail,
      Playground,
    ]),
  ],
  controllers: [WristbandsController],
  providers: [WristbandsService],
})
export class WristbandsModule {}
