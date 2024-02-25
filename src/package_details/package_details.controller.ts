import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PackageDetailsService } from './package_details.service';
import { CreatePackageDetailDto } from './dto/create-package_detail.dto';
import { UpdatePackageDetailDto } from './dto/update-package_detail.dto';

@Controller('package-details')
export class PackageDetailsController {
  constructor(private readonly packageDetailsService: PackageDetailsService) {}

  @Post()
  create(@Body() createPackageDetailDto: CreatePackageDetailDto) {
    return this.packageDetailsService.create(createPackageDetailDto);
  }

  @Get()
  findAll() {
    return this.packageDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.packageDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePackageDetailDto: UpdatePackageDetailDto,
  ) {
    return this.packageDetailsService.update(+id, updatePackageDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.packageDetailsService.remove(+id);
  }
}
