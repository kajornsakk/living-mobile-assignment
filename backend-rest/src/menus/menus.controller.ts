
import { Body, Controller, Get, Post, Delete, Param, Put } from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/createMenu.dto';
import { ApiOperation } from '@nestjs/swagger';


@Controller('menus')
export class MenusController {
    constructor(private readonly menusService: MenusService) {}

    @Post()
    @ApiOperation({ summary: 'Create Menu' })
    create(@Body() createUserDto: CreateMenuDto) {
        return this.menusService.create(createUserDto);
    }

    @Get()
    @ApiOperation({ summary: 'Find all Menus' })
    findAll() {
        return this.menusService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one menu'})
    findOne(@Param('id') id: string){
        return this.menusService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete menu' })
    remove(@Param('id') id: string) {
        return this.menusService.remove(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update category' })
    update(@Param('id') id: string, @Body() category: CreateMenuDto) {
        return this.menusService.update(id, category);
    }

}
