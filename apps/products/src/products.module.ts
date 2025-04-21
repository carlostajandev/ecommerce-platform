import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from './infrastructure/persistence/entities/product.orm.entity';
import { ProductRepositoryImpl } from './infrastructure/persistence/repositories/product.repository.impl';
import { ProductsController } from '../src/infrastructure/presentation/controllers/products.controller';

import { CreateProductUseCase } from './application/use-cases/create-product.usecase';
import { GetAllProductsUseCase } from './application/use-cases/get-all-products.usecase';
import { GetProductByIdUseCase } from './application/use-cases/get-product-by-id.usecase';
import { UpdateProductUseCase } from './application/use-cases/update-product.usecase';
import { DeleteProductUseCase } from './application/use-cases/delete-product.usecase';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'ecommerce',
      entities: [ProductEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([ProductEntity]),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: ProductRepositoryImpl,
    },
    {
      provide: CreateProductUseCase,
      useFactory: (repo) => new CreateProductUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: GetAllProductsUseCase,
      useFactory: (repo) => new GetAllProductsUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: GetProductByIdUseCase,
      useFactory: (repo) => new GetProductByIdUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: UpdateProductUseCase,
      useFactory: (repo) => new UpdateProductUseCase(repo),
      inject: ['ProductRepository'],
    },
    {
      provide: DeleteProductUseCase,
      useFactory: (repo) => new DeleteProductUseCase(repo),
      inject: ['ProductRepository'],
    },
  ],
})
export class ProductsModule { }
