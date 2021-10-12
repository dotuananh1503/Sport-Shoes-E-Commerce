import { Component, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductService } from './product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService]
})
export class ProductComponent implements OnInit {
  constructor(private productService: ProductService) { }
  selectedProduct: Product;

  ngOnInit(): void{
      this.productService.productSelected.subscribe(( product: Product ) => {
          this.selectedProduct = product;
      });
  }

}
