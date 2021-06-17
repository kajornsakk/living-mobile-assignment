import { ApiProperty } from '@nestjs/swagger';

export class CreateStoreDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    description: string;

    @ApiProperty()
    rating: number;
}