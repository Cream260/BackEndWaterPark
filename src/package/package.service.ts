import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePackageDto } from './dto/create-package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { Package } from './entities/package.entity';

let packages:Package[] = [
  {id: 1, name: 'Kid Day', detail:'kid age 10-12 years', price:499}
];
let lastPackageId = 2;

@Injectable()
export class PackageService {
  create(createPackageDto: CreatePackageDto) {

    console.log({...createPackageDto});
    const newPackage: Package ={
      id: lastPackageId++,
      ...createPackageDto,
    };
    packages.push(newPackage);
    return newPackage;
  }

  findAll() {
    return packages;
  }

  findOne(id: number) {
    const index = packages.findIndex((packaged)=> {
      return packaged.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    return packages[index];
  }

  update(id: number, updatePackageDto: UpdatePackageDto) {
    const index = packages.findIndex((packaged)=> {
      return packaged.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    console.log('package '+ JSON.stringify(packages[index]));
    console.log('update '+ JSON.stringify(updatePackageDto));
    const updatePackage: Package = {
      ...packages[index],
      ...updatePackageDto,
    };
    packages[index] = updatePackage;
    return updatePackage;
  }

  remove(id: number) {
    const index = packages.findIndex((packaged)=> {
      return packaged.id === id
    });
    if(index<0){
      throw new NotFoundException();
    }
    const deletePackage = packages[index];
    packages.splice(index, 1);
    return deletePackage;
  }
  reset(){
    packages = [
      {id: 1, name: 'Kid Day', detail:'kid age 10-12 years', price:499}
    ];
    lastPackageId = 2;
    return 'RESET';
  }
}
