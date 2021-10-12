import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/cart.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  countTotal = 0;
  loadedCartItem = [];
  user;
  constructor(private cartService: CartService, public authService: AuthService, private router: Router) {
      this.authService.profileInfo.subscribe(res => {
        this.user = res;
      })  
   }

  ngOnInit() {
    this.loadItemFromCart();
  }

  Search(){
      this.router.navigate(['/product-collector']);
  }

  countItem(){
    this.loadedCartItem.forEach(() => {
      this.countTotal += 1
    })
    console.log(this.countTotal);
  }

  loadItemFromCart(){
    this.cartService.fetchProducts().subscribe(productData => {
      this.loadedCartItem = productData;
      this.countItem();
    });
  }

  onClickonicon() {
    var icon = document.querySelector('.search__action__box');
    icon.classList.toggle('show__box');
  }  

}
