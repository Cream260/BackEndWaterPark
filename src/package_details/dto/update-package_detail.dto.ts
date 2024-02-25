import { PartialType } from '@nestjs/mapped-types';
import { CreatePackageDetailDto } from './create-package_detail.dto';

export class UpdatePackageDetailDto extends PartialType(
  CreatePackageDetailDto,
) {}
