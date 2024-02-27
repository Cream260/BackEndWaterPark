import { IsNotEmpty, Min, Length } from 'class-validator';
export class CreateEventDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  @IsNotEmpty()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @Length(3, 50)
  type: string;
}
