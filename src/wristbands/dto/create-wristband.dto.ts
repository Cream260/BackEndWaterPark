import { IsNotEmpty, Length } from 'class-validator';
import { WristbandDetail } from '../../wristband_details/entities/wristband_detail.entity';
import { Review } from '../../reviews/entities/review.entity';
export class CreateWristbandDto {
  @IsNotEmpty()
  @Length(3, 50)
  type: string;

  @IsNotEmpty()
  startDate: Date;

  @IsNotEmpty()
  endDate: Date;

  @IsNotEmpty()
  receiptId: number;

  @IsNotEmpty()
  wristband_detail: WristbandDetail[];

  @IsNotEmpty()
  review: Review[];
}
