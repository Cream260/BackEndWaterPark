import { Test, TestingModule } from '@nestjs/testing';
import { PackageDetailsController } from './package_details.controller';
import { PackageDetailsService } from './package_details.service';

describe('PackageDetailsController', () => {
  let controller: PackageDetailsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PackageDetailsController],
      providers: [PackageDetailsService],
    }).compile();

    controller = module.get<PackageDetailsController>(PackageDetailsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
