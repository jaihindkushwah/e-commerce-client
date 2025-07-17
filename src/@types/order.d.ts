export type OrderStatus =
  | "pending"
  | "accepted"
  | "pickedup"
  | "on_the_way"
  | "delivered"
  | "cancelled";

export interface IOrderItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IOrder {
  _id: Types.ObjectId;
  customerId: Types.ObjectId;
  deliveryPartnerId?: Types.ObjectId;
  items: IOrderItem[];
  status: OrderStatus;
  deliveryAddressId: Types.ObjectId;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
