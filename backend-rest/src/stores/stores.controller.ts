

import { Body, Controller, Get, Post, Delete, Param, Patch, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/createStore.dto';
import { ApiBadRequestResponse, ApiOperation } from '@nestjs/swagger';

import {
    ApiCreatedResponse,
    ApiOkResponse,
} from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';
import { StoreDto } from './dto/store.dto';


@Controller('store')
export class StoreController {
    constructor(private readonly storesService: StoresService) { }

    @Post()
    @ApiOperation({ summary: 'Create user' })
    @ApiCreatedResponse({ // HTTP 201
        description: 'The user has been successfully created.',
        type: StoreDto,
    })
    async create(@Body() createUserDto: CreateStoreDto) {
        const user = await this.storesService.create(createUserDto);
        // this will map User model value to UserDto model value.
        return plainToClass(StoreDto, user, { excludeExtraneousValues: true });
    }


    @Get()
    @ApiOperation({ summary: 'Find all store'})
    @ApiOkResponse({ // HTTP 200
        description: 'All of stores',
        isArray: true,
        type: StoreDto,
    })
    async findAll() {
        const stores = await this.storesService.findAll();
        return stores.map((stores) =>
            plainToClass(StoreDto, stores, { excludeExtraneousValues: true }),
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Find one store'})
    findOne(@Param('id') id: string){
        return this.storesService.findOne(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete store' })
    remove(@Param('id') id: string) {
        return this.storesService.remove(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update store' })
    update(@Param('id') id: string, @Body() store: CreateStoreDto) {
        return this.storesService.update(id, store);
    }


}
