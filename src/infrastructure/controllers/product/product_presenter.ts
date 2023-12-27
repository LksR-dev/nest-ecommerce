import { ApiProperty } from '@nestjs/swagger';
import { ProductM } from 'src/domain/models/product';
import { UserM } from 'src/domain/models/user';

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
  images: string;
  @ApiProperty()
  user: UserM;
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
      user,
    } = product;
    this.id = id;
    this.title = title;
    this.price = price;
    this.description = description;
    this.images = images;
    this.user = user;
    this.createddate = createddate;
    this.updateddate = updateddate;
  }
}
