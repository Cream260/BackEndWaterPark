import { IsNotEmpty } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  rate: number;

  @IsNotEmpty()
  text: string;

  @IsNotEmpty()
  wristbandId: number;

  @IsNotEmpty()
  playId: number;
}
