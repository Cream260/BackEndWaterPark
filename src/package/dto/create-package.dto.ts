import {IsNotEmpty, MinLength, IsNumber, Min} from 'class-validator'
export class CreatePackageDto {
  @IsNotEmpty()
  @MinLength(5)
  name: string;

  @IsNotEmpty()
  detail:string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price:number;
}
