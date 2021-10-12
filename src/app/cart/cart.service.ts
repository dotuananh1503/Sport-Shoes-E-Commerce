import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Product } from "../product/product.model";
import { map } from "rxjs/operators";
import { CartItem } from "./cart.model";

@Injectable()
export class CartService{
    url = "https://ng-angular-huflit-default-rtdb.asia-southeast1.firebasedatabase.app/";
    constructor(private http: HttpClient){}

    
    createProducts(loadedProduct: any[]){
        this.http.post(this.url+"cartItems.json", loadedProduct).subscribe(loadedProduct => {
          console.log(loadedProduct);
        });
    }

    
    saveProducts(loadedProduct: any[]){
        return this.http.put(this.url+"cartItems.json", loadedProduct);
    }
        
    fetchProducts(){
        return this.http.get<CartItem[]>(this.url+"cartItems.json")
        .pipe(map(productData => {
            const productsArray: CartItem[] = [];
            for(const key in productData) {
                if(productData.hasOwnProperty(key)) {
                    productsArray.push({ ... productData[key], id: key});
                }
            }
            return productsArray;
        }))
    }

    loadItemFromCart(loadedCartItem: any[]){
        this.fetchProducts().subscribe(productData => {
          loadedCartItem = productData;
          this.calcTotal(loadedCartItem);
          this.countItem(loadedCartItem);
        });
      }

      cartTotal = 0;
      countTotal = 0;
    
  calcTotal(loadedCartItem: any[]){
    this.cartTotal = 0
    loadedCartItem.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  countItem(loadedCartItem: any[]){
    this.countTotal = 0
    loadedCartItem.forEach(() => {
      this.countTotal += 1
    })
  }

    deleteProducts(){
        return this.http.delete(this.url+"cartItems.json");
    }
}