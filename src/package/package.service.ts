import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PackageDetail } from '../package_details/entities/package_detail.entity';
import { Ticket } from '../ticket/entities/ticket.entity';
@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
    @InjectRepository(PackageDetail)
    private packageDtRepository: Repository<PackageDetail>,
    @InjectRepository(Ticket)
    private TicketRepository: Repository<Ticket>,
  ) {}
  async create(createPackageDto: CreatePackageDto) {
    const packages: Package = new Package();
    packages.name = createPackageDto.name;
    packages.price = createPackageDto.price;
    packages.qty = 0;
    packages.images = createPackageDto.images;

    await this.packageRepository.save(packages);
    for (let i = 0; i < createPackageDto.package_detail.length; i++) {
      //find ticket
      const ticket = await this.TicketRepository.findOne({
        where: { id: createPackageDto.package_detail[i].ticketId },
      });

      if (ticket) {
        const package_detail = new PackageDetail();
        package_detail.name = createPackageDto.package_detail[i].name;
        package_detail.type = createPackageDto.package_detail[i].type;
        package_detail.qty = createPackageDto.package_detail[i].qty;
        package_detail.package = packages;
        package_detail.ticket = ticket;
        await this.packageDtRepository.save(package_detail);
        packages.qty += package_detail.qty; // เพิ่มจำนวนของ package โดยใช้จำนวนของ package_detail
      }
    }
    await this.packageRepository.save(packages);
    return await this.packageRepository.findOne({
      where: { id: packages.id },
      relations: ['package_detail', 'package_detail.ticket'],
    });
  }

  findAll() {
    return this.packageRepository.find({
      relations: ['package_detail', 'package_detail.ticket'],
    });
  }

  async findOne(id: number) {
    const packages = await this.packageRepository.findOne({
      where: { id: id },
      relations: ['package_detail', 'package_detail.ticket'],
    });
    if (!packages) {
      throw new NotFoundException('package not found');
    } else {
      return packages;
    }
  }

  async update(id: number, updatePackageDto: UpdatePackageDto) {
    const packge = await this.packageRepository.findOneBy({ id: id });
    if (!packge) {
      throw new NotFoundException('Package not found');
    }
    return await this.packageRepository.save({
      ...packge,
      ...updatePackageDto,
    });
  }

  async remove(id: number) {
    const packages = await this.packageRepository.findOne({
      where: { id: id },
    });
    if (!packages) {
      throw new NotFoundException('package not found');
    } else {
      await this.packageRepository.softRemove(packages);
    }
    return packages;
  }
}
