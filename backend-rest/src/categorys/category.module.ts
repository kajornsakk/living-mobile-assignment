import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CategorysService } from './categorys.service';
import { CategorysController } from './categorys.controller';

@Module({
    imports: [SequelizeModule.forFeature([CategoryModel])],
    exports: [SequelizeModule],
    providers: [CategorysService],
    controllers: [CategorysController],
})
export class CategoryModule {}
