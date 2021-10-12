import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../product.model';
import { ProductService } from '../product.service';

interface Brand {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  loadedProduct: Product[] = [
    
  ];

  brands: Brand[] = [
    {
      value: 'Adidas', viewValue: 'Adidas'
    },
    {
      value: 'Nike', viewValue: 'Nike'
    },
    {
      value: 'Vans', viewValue: 'Vans'
    },
    {
      value: 'Converse', viewValue: 'Converse'
    },
  ]
  isFetching = false;
  page = 1;
  nameSearch: string = '';
  productForm: FormGroup;
  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit() {
    this.productService.fetchProducts().subscribe(productData => {
      this.loadedProduct = productData;
    });
    console.log(this.loadedProduct);
    this.initForm();
  }

  showUpdateToastr(){
    this.toastr.success("Cập nhật thành công","Thông báo");
  }

  showCreateToastr(){
    this.toastr.success("Thao tác thành công","Thông báo");
  }


  private initForm(){
    let id = null;
    let productname = '';
    let desc = '';
    let imagePath = '';
    let price = null;

    this.productForm = new FormGroup({
        'id': new FormControl(null),
        'productname': new FormControl(null, Validators.required),
        'desc': new FormControl(null, Validators.required),
        'imagePath': new FormControl(null, Validators.required),
        'price': new FormControl(null, Validators.required),
        'brand': new FormControl('Nike', Validators.required)
      }
    );
  }

  handlePageChange(event){
      this.page = event;
  }

 
  keyID: string= 'id';
  reverse:boolean = false;
  sortByID(keyID){
    this.keyID = keyID;
    this.reverse = !this.reverse;
  }

  keyPrice: string= 'price';
  sortByPrice(keyPrice){
    this.keyPrice = keyPrice;
    this.reverse = !this.reverse;
  }


  onAddProducts(){
    if(this.editmode){
      this.loadedProduct[this.editIndex] = {
        productname: this.productForm.get('productname').value,
        desc: this.productForm.get('desc').value,
        imagePath: this.productForm.get('imagePath').value,
        price: this.productForm.get('price').value,
        brand: this.productForm.get('brand').value
      }
      this.editmode = false;
      this.productname.nativeElement.value = '';
      this.desc.nativeElement.value = '';
      this.imagePath.nativeElement.value = '';
      this.brand.nativeElement.value = 'Nike';
      this.price.nativeElement.value = null;
    }else{
      this.loadedProduct.push({
        productname: this.productForm.get('productname').value,
        desc: this.productForm.get('desc').value,
        imagePath: this.productForm.get('imagePath').value,
        price: this.productForm.get('price').value,
        brand: this.productForm.get('brand').value
      });
    }
    this.onSaveProducts();
    this.initForm();
    this.showCreateToastr();
  }

 /*  onCreateProduct(){
    this.onAddProducts();
    this.productService.createProducts(this.loadedProduct);
    this.initForm();
  } */

  onSaveProducts(){
    this.productService.saveProducts(this.loadedProduct).subscribe(loadedProduct => {
      console.log(loadedProduct);
    });
  }

  onFetchProducts(){
    this.isFetching = true;
    this.productService.fetchProducts().subscribe(productData => {
      this.loadedProduct = productData;
      this.isFetching = false;
    });
  }

  @ViewChild('id') id: ElementRef;
  @ViewChild('productname') productname: ElementRef;
  @ViewChild('desc') desc: ElementRef;
  @ViewChild('imagePath') imagePath: ElementRef;
  @ViewChild('price') price: ElementRef;
  @ViewChild('brand') brand: ElementRef;

  editmode:boolean = false;
  editIndex: number;

  onEditItem(index: number){
    this.editmode = true;
    this.editIndex = index;
    console.log(this.loadedProduct[index]);
    this.productForm.setValue({
      id: this.loadedProduct[index].id,
      productname: this.loadedProduct[index].productname,
      desc: this.loadedProduct[index].desc,
      imagePath: this.loadedProduct[index].imagePath,
      price: this.loadedProduct[index].price,
      brand: this.loadedProduct[index].brand
    })
    this.id.nativeElement.value = this.loadedProduct[index].id;
    this.productname.nativeElement.value = this.loadedProduct[index].productname;
    this.desc.nativeElement.value = this.loadedProduct[index].desc;
    this.imagePath.nativeElement.value = this.loadedProduct[index].imagePath;
    this.price.nativeElement.value = this.loadedProduct[index].price;
    this.brand.nativeElement.value = this.loadedProduct[index].brand;
  }

  onClearProducts(){
    this.productService.deleteProducts().subscribe(() => {
      this.loadedProduct = [];
    });
  }

  onDeleteItem(id){
    if(confirm("Bạn có muốn xóa sản phẩm này không?")){
      this.loadedProduct.splice(id ,1);
      this.onSaveProducts();
    }
  }




}
