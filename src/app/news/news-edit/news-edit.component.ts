import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { News } from '../news.model';
import { NewsService } from '../news.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

  public Editor = ClassicEditor;
  loadedNews: News[] = [
    
  ];
  isFetching = false;
  page = 1;
  nameSearch: string = '';
  newsForm: FormGroup;
  constructor(private newsService: NewsService, private http: HttpClient) { }

  ngOnInit() {
    this.newsService.fetchNews().subscribe(productData => {
      this.loadedNews = productData;
    });
    console.log(this.loadedNews);
    this.initForm();
  }

  private initForm(){
    let id = null;
    let title = '';
    let desc = '';
    let imagePath = '';
    let price = null;

    this.newsForm = new FormGroup({
        'id': new FormControl(null),
        'title': new FormControl(null, Validators.required),
        'author': new FormControl(null, Validators.required),
        'date': new FormControl(null, Validators.required),
        'content': new FormControl(null, Validators.required),
        'imageNews': new FormControl(null, Validators.required)
      }
    );
  }

  selectedFile: File = null;
  onFileSelected(event){
    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile)
  }
  url = "https://ng-angular-huflit-default-rtdb.asia-southeast1.firebasedatabase.app/";
  onUploadFile(){
    const fd = new FormData();
    fd.append('image', this.selectedFile, this.selectedFile.name);
    this.http.post(this.url, fd).subscribe(res => {
      console.log(res)
    })
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



  onAddNews(){
    if(this.editmode){
      this.loadedNews[this.editIndex] = {
        title: this.newsForm.get('title').value,
        author: this.newsForm.get('author').value,
        date: this.newsForm.get('date').value,
        content: this.newsForm.get('content').value,
        imageNews: this.newsForm.get('imageNews').value,
      }
      this.editmode = false;
      this.id.nativeElement.value = '',
      this.title.nativeElement.value = '',
      this.author.nativeElement.value = '',
      this.date.nativeElement.value = '',
      this.imageNews.nativeElement.value = '',
      this.content.nativeElement.value = ''
    }else{
      this.loadedNews.push({
        title: this.newsForm.get('title').value,
        author: this.newsForm.get('author').value,
        date: this.newsForm.get('date').value,
        content: this.newsForm.get('content').value,
        imageNews: this.newsForm.get('imageNews').value,
      });
    }
    this.onSaveNews();
  }

 /*  onCreateProduct(){
    this.onAddProducts();
    this.productService.createProducts(this.loadedProduct);
    this.initForm();
  } */

  onSaveNews(){
    this.newsService.saveNews(this.loadedNews).subscribe(loadedProduct => {
      console.log(loadedProduct);
    });
  }

  onFetchNews(){
    this.isFetching = true;
    this.newsService.fetchNews().subscribe(productData => {
      this.loadedNews = productData;
      this.isFetching = false;
    });
  }

  @ViewChild('id') id: ElementRef;
  @ViewChild('title') title: ElementRef;
  @ViewChild('author') author: ElementRef;
  @ViewChild('date') date: ElementRef;
  @ViewChild('content') content: ElementRef;
  @ViewChild('imageNews') imageNews: ElementRef;


  editmode:boolean = false;
  editIndex: number;

  onEditItem(index: number){
    this.editmode = true;
    this.editIndex = index;
    console.log(this.loadedNews[index]);
    this.newsForm.setValue({
      id: this.loadedNews[index].id,
      title: this.loadedNews[index].title,
      author: this.loadedNews[index].author,
      date: this.loadedNews[index].date,
      imageNews: this.loadedNews[index].imageNews,
      content: this.loadedNews[index].content
    })
    this.id.nativeElement.value = this.loadedNews[index].id,
    this.title.nativeElement.value = this.loadedNews[index].title,
    this.author.nativeElement.value = this.loadedNews[index].author,
    this.date.nativeElement.value = this.loadedNews[index].date,
    this.imageNews.nativeElement.value = this.loadedNews[index].imageNews,
    this.content.nativeElement.value = this.loadedNews[index].content
  }

  onClearNews(){
    this.newsService.deleteNews().subscribe(() => {
      this.loadedNews = [];
    });
  }

  onDeleteItem(id){
    if(confirm("Bạn có muốn xóa tin này không?")){
      this.loadedNews.splice(id ,1);
      this.onSaveNews();
    }
  }

}
