import { IsNotEmpty, Min, Length } from 'class-validator';
export class CreateEventDto {
  @IsNotEmpty()
  @Length(3, 50)
  name: string;

  // @IsNotEmpty()
  // @Length(3, 100)
  // detail: string;

  @IsNotEmpty()
  @Min(0)
  price: number;
}
