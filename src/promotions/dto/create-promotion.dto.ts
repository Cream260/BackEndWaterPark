import { IsNotEmpty, Length, Min } from 'class-validator';
export class CreatePromotionDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Length(3, 50)
  code: string;

  @IsNotEmpty()
  @Length(3, 100)
  detail: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  @Min(1)
  discount: number;
}
