import { IsNotEmpty, Min } from 'class-validator';
export class CreateWristbandDetailDto {
  @IsNotEmpty()
  namePlay: string;

  @IsNotEmpty()
  @Min(1)
  sum: number;

  @IsNotEmpty()
  @Min(1)
  rate: number;

  @IsNotEmpty()
  review: string;

  @IsNotEmpty()
  wristbandId: number;

  @IsNotEmpty()
  playId: number;
}
