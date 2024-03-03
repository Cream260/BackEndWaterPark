import { IsNotEmpty } from 'class-validator';

export class CreatePackageDetailDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  type: string;

  @IsNotEmpty()
  qty: number;

  @IsNotEmpty()
  ticketId: number;
}
