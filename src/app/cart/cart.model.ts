import { Product } from "../product/product.model";

export class CartItem{
    id: string;
    productId: string;
    productName: string;
    productImagePath: string;
    qty: number;
    price: number;

    constructor(id:string, product: Product, qty = 1) {
        this.id = id;
        this.productId = product.id;
        this.productName = product.productname;
        this.productImagePath = product.imagePath;
        this.price = product.price;
        this.qty = qty;
    }
}