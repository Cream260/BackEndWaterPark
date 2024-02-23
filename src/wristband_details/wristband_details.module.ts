import { Module } from '@nestjs/common';
import { WristbandDetailsService } from './wristband_details.service';
import { WristbandDetailsController } from './wristband_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WristbandDetail } from './entities/wristband_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WristbandDetail])],
  controllers: [WristbandDetailsController],
  providers: [WristbandDetailsService],
})
export class WristbandDetailsModule {}
