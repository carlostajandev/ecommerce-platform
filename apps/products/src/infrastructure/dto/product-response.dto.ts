// src/dto/product-response.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { Product } from '../../domain/entities/product.entity';

export class ProductResponseDto {
    @ApiProperty({ example: '1', description: 'Product ID' })
    id: string;

    @ApiProperty({ example: 'Smartphone X', description: 'Name of the product' })
    name: string;

    @ApiProperty({ example: 'High-end smartphone with 128GB storage', description: 'Product description' })
    description: string;

    @ApiProperty({ example: 699.99, description: 'Product price' })
    price: number;

    @ApiProperty({ example: 50, description: 'Stock quantity' })
    stock: number;

    constructor(product: Product) {
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.stock = product.stock;
    }
}
