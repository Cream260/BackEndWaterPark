import { IsNotEmpty, Min } from 'class-validator';
export class CreateWristbandDetailDto {
  @IsNotEmpty()
  @Min(1)
  sum: number;

  @IsNotEmpty()
  wristbandId: number;

  @IsNotEmpty()
  playId: number;
}
