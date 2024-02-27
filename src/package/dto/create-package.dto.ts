import { IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';
import { PackageDetail } from '../../package_details/entities/package_detail.entity';
export class CreatePackageDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  package_detail: PackageDetail[];
}
