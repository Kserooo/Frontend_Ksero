import { Product } from "src/app/models/product";

export interface PurchaseData {
    totalAmount: number;
    productsToPurchase: Product[];
    operationCode?: string;
}