import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  NotFoundException,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiNotFoundResponse,
  ApiCreatedResponse,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateProductDto } from '../../dto/create-product.dto';
import { ProductResponseDto } from '../../dto/product-response.dto';
import { CreateProductUseCase } from '../../../application/use-cases/create-product.usecase';
import { GetAllProductsUseCase } from '../../../application/use-cases/get-all-products.usecase';
import { GetProductByIdUseCase } from '../../../application/use-cases/get-product-by-id.usecase';
import { UpdateProductUseCase } from '../../../application/use-cases/update-product.usecase';
import { DeleteProductUseCase } from '../../../application/use-cases/delete-product.usecase';
import { Product } from '../../../domain/entities/product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly getProductByIdUseCase: GetProductByIdUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) { }

  @Post('create')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiCreatedResponse({
    description: 'Product created successfully',
    type: ProductResponseDto,
  })
  async create(@Body() body: CreateProductDto): Promise<{ message: string; data: ProductResponseDto }> {
    const product = new Product(
      body.id,
      body.name,
      body.description,
      body.price,
      body.stock,
    );
    await this.createProductUseCase.execute(product);
    return {
      message: 'Product created successfully',
      data: new ProductResponseDto(product),
    };
  }

  @Get('all')
  @ApiOperation({ summary: 'Retrieve all products' })
  @ApiOkResponse({
    description: 'List of products',
    type: [ProductResponseDto],
  })
  async findAll(): Promise<{ message: string; data: ProductResponseDto[] }> {
    const products = await this.getAllProductsUseCase.execute();
    const response = products.map((p) => new ProductResponseDto(p));
    return {
      message: 'Products retrieved successfully',
      data: response,
    };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a product by ID' })
  @ApiOkResponse({
    description: 'Product found',
    type: ProductResponseDto,
  })
  @ApiNotFoundResponse({ description: 'Product not found' })
  async findOne(@Param('id') id: string): Promise<{ message: string; data: ProductResponseDto }> {
    const product = await this.getProductByIdUseCase.execute(id);
    if (!product) throw new NotFoundException('Product not found');
    return {
      message: 'Product retrieved successfully',
      data: new ProductResponseDto(product),
    };
  }

  @Put(':id/update')
  @ApiOperation({ summary: 'Update a product by ID' })
  @ApiOkResponse({
    description: 'Product updated',
    type: ProductResponseDto,
  })
  async update(
    @Param('id') id: string,
    @Body() body: CreateProductDto,
  ): Promise<{ message: string; data: ProductResponseDto }> {
    const updatedProduct = new Product(
      id,
      body.name,
      body.description,
      body.price,
      body.stock,
    );
    await this.updateProductUseCase.execute(id, updatedProduct);
    return {
      message: 'Product updated successfully',
      data: new ProductResponseDto(updatedProduct),
    };
  }

  @Delete(':id/delete')
  @ApiOperation({ summary: 'Delete a product by ID' })
  @ApiOkResponse({ description: 'Product deleted successfully' })
  async delete(@Param('id') id: string): Promise<{ message: string }> {
    await this.deleteProductUseCase.execute(id);
    return {
      message: 'Product deleted successfully',
    };
  }
}
