import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';
export declare class PackageService {
    create(createPackageDto: CreatePackageDto): Package;
    findAll(): Package[];
    findOne(id: number): Package;
    update(id: number, updatePackageDto: UpdatePackageDto): Package;
    remove(id: number): Package;
    reset(): string;
}
