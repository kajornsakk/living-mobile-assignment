import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModel } from './store.model';
import { StoresService } from './stores.service';
import { StoreController } from './stores.controller';

@Module({
    imports: [SequelizeModule.forFeature([StoreModel])],
    exports: [SequelizeModule],
    providers: [StoresService],
    controllers: [StoreController],
})
export class StoreModule {}
