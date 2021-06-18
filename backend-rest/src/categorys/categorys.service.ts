import { Injectable } from '@nestjs/common';

import { InjectModel } from '@nestjs/sequelize';
import { CategoryModel } from './category.model';
import { CreateCategoryDto } from './dto/createCategory.dto';

@Injectable()
export class CategorysService {
    constructor(
        @InjectModel(CategoryModel) // inject model and use it as repository
        private categoryRepo: typeof CategoryModel, // UserModel act like userRepo here.
      ) {}
    
      create(user: CreateCategoryDto) {
          // userRepo is Sequelize model it have many functions to work with database.
          // more info please see below documents.
          return this.categoryRepo.create(user);
      }
    
      findAll() {
          return this.categoryRepo.findAll();
      }

      findOne(id: string): Promise<CategoryModel>{
        return this.categoryRepo.findOne({where:{id:id}})
    }

    async remove(id: string): Promise<void> {
        await this.categoryRepo.destroy({
            where: {id:id}
          });
    }

    async update(id: string, store: CreateCategoryDto) {
        await this.categoryRepo.update(store,{
            where:{id:id}
        })
    }
}
