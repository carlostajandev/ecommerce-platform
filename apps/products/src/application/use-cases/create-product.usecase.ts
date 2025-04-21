// application/use-cases/create-product.usecase.ts

import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';
import { v4 as uuidv4 } from 'uuid';

export class CreateProductUseCase {
    constructor(private readonly productRepo: ProductRepository) { }

    async execute(data): Promise<Product> {
        const product = new Product(
            data.id,
            data.name,
            data.description,
            data.price,
            data.stock
        );
        return await this.productRepo.create(product);
    }
}
