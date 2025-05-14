import { ProductCollection, ProductSize, ProductStatus } from "../enums/product.enum";


export interface Product extends Document {
    _id: string;
    productStatus: ProductStatus;
    productCollection: ProductCollection;
    productName: string;
    productPrice: number;
    productLeftCount: number;
    productSize: ProductSize;
    productVolume: number;
    productDesc?: string;
    productImages: string[];
    productViews: number;
    createdAt: Date;
    updatedAt: Date;
 }

export interface ProductInquiry {
   order: string;
   page: number;
   limit: number;
   productCollection?: ProductCollection;
   search?: string; 
}