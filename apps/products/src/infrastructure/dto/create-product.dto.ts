// src/dto/create-product.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
    @ApiProperty({ example: '1', description: 'Unique identifier for the product' })
    id: string;

    @ApiProperty({ example: 'Smartphone X', description: 'Name of the product' })
    name: string;

    @ApiProperty({ example: 'High-end smartphone with 128GB storage', description: 'Product description' })
    description: string;

    @ApiProperty({ example: 699.99, description: 'Price of the product in USD' })
    price: number;

    @ApiProperty({ example: 50, description: 'Number of items available in stock' })
    stock: number;
}
