import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../cart/cart.service';
import { AuthService } from '../shared/auth.service';
import { CheckoutService } from './checkout.service';

interface CheckMethod {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [CheckoutService]
})
export class CheckoutComponent implements OnInit {

  loadedCartItem = [];
  cartCheckout = [];
  cartTotal = 0;
  countTotal = 0;
  UserName: any;
  UserDisplayName: any;
  checkoutForm: FormGroup;
  user;
  constructor(private checkoutService: CheckoutService, private toastService: ToastrService,
              private cartService: CartService, public authService: AuthService) { 
                this.authService.profileInfo.subscribe(res => {
                  this.user = res;
                })  
  }

  ngOnInit() {
    this.loadItemFromCart();
    this.initForm();
    this.testUser();
  }

  testUser(){
    if(this.authService.currentUser){
      this.UserName = this.authService.currentUserName
      this.UserDisplayName = this.authService.currentUserDisPlayName,
      console.log(this.UserName)
      console.log(this.UserDisplayName)
    }else if(this.user.displayName != ''){
      this.UserName = this.user.email
      this.UserDisplayName = this.user.displayName
    }
    else{
      this.UserDisplayName = '';
      this.UserName = '';
      console.log(this.UserDisplayName)
      console.log(this.UserName)
    }
  }

  checkmethods: CheckMethod[] = [
    {
      value: 'Thanh toán khi nhận hàng', viewValue: 'Thanh toán khi nhận hàng'
    },
    {
      value: 'Chuyển khoản', viewValue: 'Chuyển khoản'
    }
  ]

  private initForm(){
    let productname = '';
    let desc = '';
    let imagePath = '';
    let price = null;

    this.checkoutForm = new FormGroup({
        'customername': new FormControl(null, Validators.required),
        'email': new FormControl('', Validators.required),
        'address': new FormControl(null, Validators.required),
        'note': new FormControl(null, Validators.required),
        'checkmethod': new FormControl('Thanh toán khi nhận hàng', Validators.required)
      }
    );

    setTimeout(() => {
      this.checkoutForm.setValue({
        customername: this.UserDisplayName,
        email: this.UserName,
        address: '',
        note: '',
        checkmethod: 'Thanh toán khi nhận hàng'
      })
    },500)

  }

  showToastr(){
    this.toastService.success("Tạo đơn hàng thành công","Thông báo");
  }
  

  onAddCheckout(){
    let dateA = new Date();
    this.cartCheckout.push({
      email: this.checkoutForm.get('email').value,
      customername: this.checkoutForm.get('customername').value,
      address: this.checkoutForm.get('address').value,
      note: this.checkoutForm.get('note').value,
      checkmethod: this.checkoutForm.get('checkmethod').value,
      products: this.loadedCartItem,
      state: 'Đơn hàng vừa tạo',
      dateCreate: Date.UTC(dateA.getFullYear(), dateA.getMonth(), dateA.getDay()),
      totalPrice: this.cartTotal
    })
    this.initForm();
  }

  onSendCheckout(){
    this.onAddCheckout();
    this.checkoutService.createProducts(this.cartCheckout);
    this.onClearProducts();
    this.showToastr();
    this.initForm();
  }

  onClearProducts(){
    this.cartService.deleteProducts().subscribe(() => {
      this.loadedCartItem = [];
    });
  }

  loadItemFromCart(){
    this.cartService.fetchProducts().subscribe(productData => {
      this.loadedCartItem = productData;
      this.calcTotal();
      this.countItem();
    });
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
}
