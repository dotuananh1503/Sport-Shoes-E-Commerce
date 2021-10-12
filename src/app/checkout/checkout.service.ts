import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class CheckoutService {
   
    url = "https://ng-angular-huflit-default-rtdb.asia-southeast1.firebasedatabase.app/";
    constructor(private http: HttpClient){}

    
    createProducts(loadedCheckout: any[]){
        this.http.post<{name:string}>(this.url+"carts.json", loadedCheckout).subscribe(loadedCheckout => {
          console.log(loadedCheckout);
        });
    }

    saveProducts(loadedCheckout: any[]){
        return this.http.put(this.url+"carts.json", loadedCheckout);
    }
        
    fetchProducts(){
        return this.http.get(this.url+"carts.json")
        .pipe(map(productData => {
            const productsArray = [];
            for(const key in productData) {
                if(productData.hasOwnProperty(key)) {
                    productsArray.push({ ... productData[key], id: key});
                }
            }
            return productsArray;
        }))
    }

    deleteProducts(){
        return this.http.delete(this.url+"carts.json");
    }
}
