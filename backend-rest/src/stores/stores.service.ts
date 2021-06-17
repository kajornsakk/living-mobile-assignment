import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { StoreModel } from './store.model';
import { CreateStoreDto } from './dto/createStore.dto';

@Injectable()
export class StoresService {
    // findOne(id: string) {
    //     throw new Error('Method not implemented.');
    // }
    constructor(
        @InjectModel(StoreModel) // inject model and use it as repository
        private storeRepo: typeof StoreModel, // UserModel act like userRepo here.
    ) { }

    create(user: CreateStoreDto) {
        // userRepo is Sequelize model it have many functions to work with database.
        // more info please see below documents.
        return this.storeRepo.create(user);
    }

    findAll() {
        return this.storeRepo.findAll();
    }

    async remove(id: string): Promise<void> {
        await this.storeRepo.destroy({
            where: {id:id}
          });
    }

    findOne(id: string): Promise<StoreModel>{
        return this.storeRepo.findOne({where:{id:id}})
    }

    async update(id: string, store: CreateStoreDto) {
        await this.storeRepo.update(store,{
            where:{id:id}
        })
    }



}
