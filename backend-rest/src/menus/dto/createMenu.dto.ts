import { ApiProperty } from '@nestjs/swagger';

export class CreateMenuDto {
    @ApiProperty()
    categoryId: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    price: number;
}