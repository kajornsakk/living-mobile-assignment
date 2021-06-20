import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SequelizeModule } from '@nestjs/sequelize';
import { StoreModule } from './stores/stores.module';
import { CategoryModule } from './categorys/category.module';
import { CategorysService } from './categorys/categorys.service';
import { MenusModule } from './menus/menus.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'secret',
      database: 'rest_api',
      autoLoadModels: true,
      synchronize: true,
      }),
    StoreModule,
    CategoryModule,
    MenusModule,
  ],
  controllers: [AppController],
  providers: [AppService, CategorysService],
})
export class AppModule {}
