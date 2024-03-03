/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDetailDto } from './dto/create-package_detail.dto';
import { UpdatePackageDetailDto } from './dto/update-package_detail.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PackageDetail } from './entities/package_detail.entity';
import { Package } from '../package/entities/package.entity';
import { Ticket } from '../ticket/entities/ticket.entity';

@Injectable()
export class PackageDetailsService {
  constructor(
    @InjectRepository(PackageDetail)
    private packageDtRepository: Repository<PackageDetail>,
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}
  async create(createPackageDetailDto: CreatePackageDetailDto) {
    return this.packageDtRepository.save(createPackageDetailDto);
  }

  findAll() {
    return this.packageDtRepository.find({
      relations: ['package', 'ticket'],
    });
  }

  async findOne(id: number) {
    const package_detail = await this.packageDtRepository.findOne({
      where: { id: id },
      relations: ['package', 'ticket'],
    });
    if (!package_detail) {
      throw new NotFoundException('package detail not found');
    } else {
      return package_detail;
    }
  }

  async update(id: number, updatePackageDetailDto: UpdatePackageDetailDto) {
    const package_detail = await this.packageDtRepository.findOneBy({ id: id });
    if (!package_detail) {
      throw new NotFoundException('package detail not found');
    }
    return await this.packageDtRepository.save({
      ...package_detail,
      ...updatePackageDetailDto,
    });
  }

  async remove(id: number) {
    const package_detail = await this.packageDtRepository.findOneBy({ id: id });
    if (!package_detail) {
      throw new NotFoundException('package detail not found');
    }
    return this.packageDtRepository.softRemove(package_detail);
  }
}
