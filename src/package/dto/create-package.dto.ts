import { IsNotEmpty, MinLength, IsNumber, Min } from 'class-validator';
import { CreatePackageDetailDto } from '../../package_details/dto/create-package_detail.dto';
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
  images: string;

  @IsNotEmpty()
  package_detail: CreatePackageDetailDto[];
}
