// infrastructure/repositories/product.repository.impl.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.orm.entity';
import { Repository } from 'typeorm';
import { ProductRepository } from '../../../domain/repositories/product.repository';
import { Product } from '../../../domain/entities/product.entity';

@Injectable()
export class ProductRepositoryImpl implements ProductRepository {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly repo: Repository<ProductEntity>,
    ) { }

    async create(product: Product): Promise<Product> {
        await this.repo.save(product);
        return product;
    }

    async findAll(): Promise<Product[]> {
        return await this.repo.find();
    }

    async findById(id: string): Promise<Product | null> {
        return await this.repo.findOneBy({ id });
    }

    async update(id: string, data: Partial<Product>): Promise<Product> {
        await this.repo.update(id, data);
        return await this.findById(id) as Product;
    }

    async delete(id: string): Promise<void> {
        await this.repo.delete(id);
    }
}
