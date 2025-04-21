// domain/repositories/product.repository.ts

import { Product } from '../entities/product.entity';

export abstract class ProductRepository {
    abstract create(product: Product): Promise<Product>;
    abstract findAll(): Promise<Product[]>;
    abstract findById(id: string): Promise<Product | null>;
    abstract update(id: string, product: Partial<Product>): Promise<Product>;
    abstract delete(id: string): Promise<void>;
}
