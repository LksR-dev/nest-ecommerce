import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from 'src/domain/models/product';

export class ProductPresenter {
  @ApiProperty()
  id: string;
  @ApiProperty()
  title: string;
  @ApiProperty()
  price: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  images: string[];
  @ApiProperty()
  unable: boolean;
  @ApiProperty()
  createddate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(product: ProductM) {
    const {
      createddate,
      description,
      id,
      images,
      price,
      title,
      updateddate,
      unable,
    } = product;
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.images = images;
    this.unable = unable;
    this.createddate = createddate;
    this.updateddate = updateddate;
  }
}
