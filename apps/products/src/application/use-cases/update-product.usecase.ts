// application/use-cases/update-product.usecase.ts

import { Product } from '../../domain/entities/product.entity';
import { ProductRepository } from '../../domain/repositories/product.repository';

export class UpdateProductUseCase {
    constructor(private readonly productRepo: ProductRepository) { }

    async execute(id: string, data: Partial<Product>): Promise<Product> {
        return await this.productRepo.update(id, data);
    }
}
