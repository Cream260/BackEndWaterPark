import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class PackageService {
  constructor(
    @InjectRepository(Package)
    private packageRepository: Repository<Package>,
  ) {}
  create(createPackageDto: CreatePackageDto) {
    return this.packageRepository.save(createPackageDto);
  }

  findAll() {
    return this.packageRepository.find();
  }

  async findOne(id: number) {
    const packaged = await this.packageRepository.findOneBy({ id: id });
    if (!packaged) {
      throw new NotFoundException('Package not found');
    } else {
      return packaged;
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
    const packaged = await this.packageRepository.findOneBy({ id: id });
    if (!packaged) {
      throw new NotFoundException('Package not found');
    }
    return this.packageRepository.softRemove(packaged);
  }
}
