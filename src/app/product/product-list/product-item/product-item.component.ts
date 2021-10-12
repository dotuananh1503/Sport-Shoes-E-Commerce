import { Component, Input, OnInit } from '@angular/core';
import { CartService } from 'src/app/cart/cart.service';
import { MessengerService } from 'src/app/shared/messenger.service';
import { Product } from '../../product.model';
import { ProductService } from '../../product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  @Input() index: number;
  constructor( private productService: ProductService, private msg: MessengerService, private cartService: CartService) { }

  ngOnInit() {
      //this.productService.getProduct(this.index);
  }

  handleAddToCart() {
    this.msg.sendMsg(this.product);
  }

}
