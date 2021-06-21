import { ApiProperty } from '@nestjs/swagger';

import { IsString, IsAlpha, Length, IsNotEmpty } from 'class-validator';
export class CreateStoreDto {

    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    rating: number;
}