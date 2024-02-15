import { PackageService } from './package.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
export declare class PackageController {
    private readonly packageService;
    constructor(packageService: PackageService);
    create(createPackageDto: CreatePackageDto): import("./entities/package.entity").Package;
    findAll(): import("./entities/package.entity").Package[];
    reset(): string;
    findOne(id: string): import("./entities/package.entity").Package;
    update(id: string, updatePackageDto: UpdatePackageDto): import("./entities/package.entity").Package;
    remove(id: string): import("./entities/package.entity").Package;
}
