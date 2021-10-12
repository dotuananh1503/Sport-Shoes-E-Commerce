import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckoutService } from '../checkout.service';

interface CheckMethod {
  value: string;
  viewValue: string;
}

interface State {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-checkout-edit',
  templateUrl: './checkout-edit.component.html',
  styleUrls: ['./checkout-edit.component.css']
})
export class CheckoutEditComponent implements OnInit {

  loadedBill = [];
  loadedProductFromBills = [];
  loadedProductFromBillss = [];
  constructor(private checkoutService: CheckoutService) { 

  }

  checkmethods: CheckMethod[] = [
    {
      value: 'Thanh toán khi nhận hàng', viewValue: 'Thanh toán khi nhận hàng'
    },
    {
      value: 'Chuyển khoản', viewValue: 'Chuyển khoản'
    }
  ]

  states: State[] = [
    {
      value: 'Đơn hàng vừa tạo', viewValue: 'Đơn hàng vừa tạo'
    },
    {
      value: 'Đã nhận đơn', viewValue: 'Đã nhận đơn'
    },
    {
      value: 'Đang đóng gói', viewValue: 'Đang đóng gói'
    },
    {
      value: 'Đang vận chuyển', viewValue: 'Đang vận chuyển'
    },
    {
      value: 'Đã giao', viewValue: 'Đã giao'
    },
    {
      value: 'Đã hủy', viewValue: 'Đã hủy'
    }
  ]

  panelOpenState = false;

  ngOnInit() {
      this.checkoutService.fetchProducts().subscribe(payment => {
            this.loadedBill = payment;
            //this.loadedProductFromBills = payment[0][0].products;
            payment.forEach((item) => {
                this.loadedProductFromBills.push(item);
                //console.log(this.loadedProductFromBills);
            });
            for(let i = 0; i < this.loadedProductFromBills.length; i++){
              let j = 0;
              this.loadedProductFromBillss.push(this.loadedProductFromBills[i][j].products) 
              console.log(this.loadedProductFromBillss)
            }

            //console.log(this.loadedProductFromBills)
            //console.log(this.loadedBill);
      })
  }

 

}
