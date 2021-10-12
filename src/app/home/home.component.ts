import { AotSummaryResolver } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/cart.service';
import { News } from '../news/news.model';
import { NewsService } from '../news/news.service';
import { Product } from '../product/product.model';
import { MessengerService } from '../shared/messenger.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  newsItems: News[];
  newsItemss: News[];
  @Input() newsLatest: News;
  @Input() index: number;
  constructor(private newsService: NewsService, private msg: MessengerService, private cartService: CartService,
              private toastr: ToastrService) { }

  cartItems = [

  ];
  ngOnInit() {
    this.msg.getMsg().subscribe((product: Product) => {
      this.addProductToCart(product)
     })
    this.newsService.fetchNews().subscribe(res => {
      this.newsItems = res;
      this.newsItemss = this.newsItems.slice(0,3);
    });
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

    localStorage.setItem('localStore',JSON.stringify(this.cartItems));

    
    this.showToastr();
    this.onSaveProducts();
/*     this.cartService.createProducts(this.cartItems) */

  }

  onSaveProducts(){
    this.cartService.saveProducts(this.cartItems).subscribe(item => {
      console.log(item)
    })
  }

  showToastr(){
    this.toastr.success("Thêm vào giỏ hàng thành công","Thông báo");
  }

}
