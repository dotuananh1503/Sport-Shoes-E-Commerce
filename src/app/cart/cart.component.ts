import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product/product.model';
import { MessengerService } from '../shared/messenger.service';
import { CartItem } from './cart.model';
import { CartService } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartService]
})
export class CartComponent implements OnInit {

  cartItems = [

  ];

  getItems = [

  ];

  loadedCartItem = [

  ];

  cartTotal = 0;
  countTotal = 0;
  constructor(private router: Router,private msg: MessengerService, private toastr: ToastrService, private cartService: CartService) { }

  ngOnInit() {

    this.getItems = JSON.parse(localStorage.getItem('localStore'));
    this.loadItemFromCart();
  }

  onWarning(){
    this.toastr.warning("Giỏ hàng của bạn chưa có sản phẩm nào", "Cảnh báo")
  }

  loadItemFromCart(){
    this.cartService.fetchProducts().subscribe(productData => {
      this.loadedCartItem = productData;
      this.countItem();
      this.calcTotal();
    });
  }

  showToastr(){
    this.toastr.success("Thêm vào giỏ hàng thành công","Thông báo");
  }

  addProductToCart(product: Product) {
    let productExist = false;

    for(let i in this.cartItems) {
      if(this.cartItems[i].productId === product.id) {
        this.cartItems[i].qty++
        productExist = true;
        break;
      }
    }

    if(!productExist) {
      this.cartItems.push({
        productId: product.id,
        productName: product.productname,
        productImagePath: product.imagePath,
        qty: 1,
        price: product.price
      })
    }

    //localStorage.setItem('localStore',JSON.stringify(this.cartItems));

    
    this.showToastr();
    this.onSaveProducts();


  }

  
  calcTotal(){
    this.cartTotal = 0
    this.loadedCartItem.forEach(item => {
      this.cartTotal += (item.qty * item.price)
    })
  }

  countItem(){
    this.countTotal = 0
    this.loadedCartItem.forEach(() => {
      this.countTotal += 1
    })
  }

  getItemData(){
    return this.getItems;
  }

  showCartItem(){
    console.log(this.getItems);
  }

  onSaveProducts(){
    this.cartService.saveProducts(this.cartItems).subscribe(item => {
      console.log(item)
    })
  }

  onSaveProductss(){
    this.cartService.saveProducts(this.loadedCartItem).subscribe(item => {
      console.log(item)
    })
  }

  onClearCart(){
    this.cartService.deleteProducts().subscribe(() => {
      this.loadedCartItem = [];
      this.countItem();
      this.calcTotal();
    })
  }

  onDeleteItem(id){
    if(confirm("Bạn có muốn xóa sản phẩm này không?")){
      this.loadedCartItem.splice(id ,1);
      this.countItem();
      this.calcTotal();
      this.onSaveProductss();
    }
  }

}
