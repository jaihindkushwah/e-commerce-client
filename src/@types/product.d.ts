export interface IProduct {
  _id: Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  stock: number;
  category?: string;
  isAvailable?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
