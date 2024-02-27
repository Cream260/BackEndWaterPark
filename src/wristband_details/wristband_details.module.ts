import { Module } from '@nestjs/common';
import { WristbandDetailsService } from './wristband_details.service';
import { WristbandDetailsController } from './wristband_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WristbandDetail } from './entities/wristband_detail.entity';
import { Wristband } from '../wristbands/entities/wristband.entity';
import { Playground } from '../playgrounds/entities/playground.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WristbandDetail, Wristband, Playground])],
  controllers: [WristbandDetailsController],
  providers: [WristbandDetailsService],
})
export class WristbandDetailsModule {}
