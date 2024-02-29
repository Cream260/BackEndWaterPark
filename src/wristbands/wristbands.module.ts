import { Module } from '@nestjs/common';
import { WristbandsService } from './wristbands.service';
import { WristbandsController } from './wristbands.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wristband } from './entities/wristband.entity';
import { WristbandDetail } from '../wristband_details/entities/wristband_detail.entity';
import { Playground } from '../playgrounds/entities/playground.entity';
import { QrService } from '../qr.service';

@Module({
  imports: [TypeOrmModule.forFeature([Wristband, WristbandDetail, Playground])],
  controllers: [WristbandsController],
  providers: [WristbandsService, QrService],
})
export class WristbandsModule {}
