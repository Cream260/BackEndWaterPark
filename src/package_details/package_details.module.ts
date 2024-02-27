import { Module } from '@nestjs/common';
import { PackageDetailsService } from './package_details.service';
import { PackageDetailsController } from './package_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackageDetail } from './entities/package_detail.entity';
import { Package } from '../package/entities/package.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageDetail, Package, Ticket])],
  controllers: [PackageDetailsController],
  providers: [PackageDetailsService],
})
export class PackageDetailsModule {}
