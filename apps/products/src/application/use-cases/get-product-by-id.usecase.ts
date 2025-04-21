// application/use-cases/get-product-by-id.usecase.ts

import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class GetProductByIdUseCase {
    constructor(private readonly productRepo: ProductRepository) { }

    async execute(id: string): Promise<Product | null> {
        return await this.productRepo.findById(id);
    }
}
