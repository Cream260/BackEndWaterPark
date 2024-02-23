import { PartialType } from '@nestjs/mapped-types';
import { CreateWristbandDetailDto } from './create-wristband_detail.dto';

export class UpdateWristbandDetailDto extends PartialType(CreateWristbandDetailDto) {}
