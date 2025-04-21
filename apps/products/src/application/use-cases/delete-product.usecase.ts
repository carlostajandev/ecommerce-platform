// application/use-cases/delete-product.usecase.ts

import { ProductRepository } from '../../domain/repositories/product.repository';

export class DeleteProductUseCase {
    constructor(private readonly productRepo: ProductRepository) { }

    async execute(id: string): Promise<void> {
        await this.productRepo.delete(id);
    }
}
