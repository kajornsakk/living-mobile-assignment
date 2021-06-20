import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { MenuModel } from './menu.model';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
    imports: [SequelizeModule.forFeature([MenuModel])],
    exports: [SequelizeModule],
    providers: [MenusService],
    controllers: [MenusController],
})
export class MenusModule {}
