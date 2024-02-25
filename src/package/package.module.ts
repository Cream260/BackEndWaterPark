import { Module } from '@nestjs/common';
import { PackageService } from './package.service';
import { PackageController } from './package.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './entities/package.entity';
import { PackageDetail } from '../package_details/entities/package_detail.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Package, PackageDetail, Ticket])],
  controllers: [PackageController],
  providers: [PackageService],
})
export class PackageModule {}
