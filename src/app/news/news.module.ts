import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CKEditorModule } from "@ckeditor/ckeditor5-angular";
import { NewsDetailComponent } from "./news-detail/news-detail.component";
import { NewsEditComponent } from "./news-edit/news-edit.component";
import { NewsLastestComponent } from "./news-lastest/news-lastest.component";
import { NewsItemComponent } from "./news-list/news-item/news-item.component";
import { NewsListComponent } from "./news-list/news-list.component";
import { NgxPaginationModule, PaginationControlsComponent } from 'ngx-pagination';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import Base64UploadAdapter from '@ckeditor/ckeditor5-upload/src/adapters/base64uploadadapter';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
    declarations: [
        NewsDetailComponent,
        NewsItemComponent,
        NewsLastestComponent,
        NewsEditComponent,
        NewsListComponent
    ],
    imports: [
        CommonModule,
        CKEditorModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        Ng2OrderModule,
        Ng2SearchPipeModule,
        NgxPaginationModule,
        RouterModule
    ],
    exports: [
        NewsDetailComponent,
        NewsItemComponent,
        NewsLastestComponent,
        NewsEditComponent,
        NewsListComponent
    ],
    providers: [],
    bootstrap: []
})

export class NewsModule {}