import { ProductListComponent } from './product-list/product-list.component';
import { ProductItemComponent } from './product-list/product-item/product-item.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ProductCollectorComponent } from './product-collector/product-collector.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MoneyPipe } from './money.pipe';
import { NgxPaginationModule, PaginationControlsComponent } from 'ngx-pagination';
import { FilterPipe } from './filter.pipe';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {MatPaginatorModule} from '@angular/material/paginator';
import { ProductCommentComponent } from './product-comment/product-comment.component';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
    declarations: [
        ProductListComponent,
        ProductItemComponent,
        ProductCollectorComponent,
        ProductEditComponent,
        MoneyPipe,
        FilterPipe,
        ProductDetailComponent,
        ProductCommentComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        NgxPaginationModule,
        FormsModule,
        MatTabsModule,
        MatPaginatorModule,
        Ng2OrderModule,
        Ng2SearchPipeModule,
        SlickCarouselModule
    ],
    exports: [
        ProductListComponent,
        ProductItemComponent,
        ProductEditComponent,
        ProductCollectorComponent,
        MoneyPipe,
        FilterPipe,
        ProductDetailComponent,
        ProductCommentComponent
    ],
    providers: [],
    bootstrap: []
})

export class ProductModule {}