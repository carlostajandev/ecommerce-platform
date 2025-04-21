// application/use-cases/get-all-products.usecase.ts

import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class GetAllProductsUseCase {
    constructor(private readonly productRepo: ProductRepository) { }

    async execute(): Promise<Product[]> {
        return await this.productRepo.findAll();
    }
}
