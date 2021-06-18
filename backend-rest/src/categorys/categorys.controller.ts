
import { Body, Controller, Get, Post, Param, Delete, Put } from '@nestjs/common';
import { CategorysService } from './categorys.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { ApiOperation } from '@nestjs/swagger';

import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { CategoryDto } from './dto/category.dto';


@Controller('categorys')
export class CategorysController {
    constructor(private readonly categorysService: CategorysService) {}

    @Post()
    @ApiOperation({ summary: 'Create category' })
    create(@Body() createUserDto: CreateCategoryDto) {
        return this.categorysService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all category' })
    findAll() {
        return this.categorysService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one category'})
    findOne(@Param('id') id: string){
        return this.categorysService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete catogory' })
    remove(@Param('id') id: string) {
        return this.categorysService.remove(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category' })
    update(@Param('id') id: string, @Body() category: CreateCategoryDto) {
        return this.categorysService.update(id, category);
    }

}
