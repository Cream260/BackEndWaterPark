"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PackageService = void 0;
const common_1 = require("@nestjs/common");
let packages = [
    { id: 1, name: 'Kid Day', detail: 'kid age 10-12 years', price: 499 }
];
let lastPackageId = 2;
let PackageService = class PackageService {
    create(createPackageDto) {
        console.log({ ...createPackageDto });
        const newPackage = {
            id: lastPackageId++,
            ...createPackageDto,
        };
        packages.push(newPackage);
        return newPackage;
    }
    findAll() {
        return packages;
    }
    findOne(id) {
        const index = packages.findIndex((packaged) => {
            return packaged.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        return packages[index];
    }
    update(id, updatePackageDto) {
        const index = packages.findIndex((packaged) => {
            return packaged.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        console.log('package ' + JSON.stringify(packages[index]));
        console.log('update ' + JSON.stringify(updatePackageDto));
        const updatePackage = {
            ...packages[index],
            ...updatePackageDto,
        };
        packages[index] = updatePackage;
        return updatePackage;
    }
    remove(id) {
        const index = packages.findIndex((packaged) => {
            return packaged.id === id;
        });
        if (index < 0) {
            throw new common_1.NotFoundException();
        }
        const deletePackage = packages[index];
        packages.splice(index, 1);
        return deletePackage;
    }
    reset() {
        packages = [
            { id: 1, name: 'Kid Day', detail: 'kid age 10-12 years', price: 499 }
        ];
        lastPackageId = 2;
        return 'RESET';
    }
};
exports.PackageService = PackageService;
exports.PackageService = PackageService = __decorate([
    (0, common_1.Injectable)()
], PackageService);
//# sourceMappingURL=package.service.js.map