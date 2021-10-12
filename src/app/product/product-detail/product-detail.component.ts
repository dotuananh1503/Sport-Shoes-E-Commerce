import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Product } from '../product.model';
import { ProductService } from '../product.service';
import * as $ from 'jquery';
import * as slick from 'slick-carousel';
import { CommentService } from '../product-comment/comment.service';
import { MessengerService } from 'src/app/shared/messenger.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;
  id: number;
  comments = [];
  constructor(private productService: ProductService,
              private route: ActivatedRoute,
              private commentService: CommentService,
              private msg: MessengerService
    ) { }

  
    ngOnInit() {
      this.route.paramMap.subscribe(param => {
        let pid = param.get('id')
        this.productService.fetchProductsbyId(param.get('id')).subscribe(res => {
          this.product = res;
        })
      })
      

      this.commentService.fetchProducts().subscribe(res => {
          this.comments = res;
          console.log(this.comments)
      })
  }

  handleAddToCart() {
    this.msg.sendMsg(this.product);
  }

}
