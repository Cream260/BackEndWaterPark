import { IsNotEmpty, Length, Min } from 'class-validator';
export class CreateWristbandDto {

  @IsNotEmpty()
  @Length(3, 50)
  type: string;

  @IsNotEmpty()
  @Length(3,100)
  detail: string;

  @IsNotEmpty()
  startDate: Date;
  
  @IsNotEmpty()
  endDate: Date;

}
