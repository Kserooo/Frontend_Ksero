export interface Order {
  id: number;
  quantity: number;
  retailSellerId: number;
  productId: number;
  operationCode?: string;
  isPaid?: boolean;
}
